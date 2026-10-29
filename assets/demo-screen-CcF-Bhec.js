var e={id:`loan-demo`,compiledXml:`<FForm Id="loanForm">
  <div Class="muted">
    <p>Demo multi-table runtime. Pokok saat ini: <strong>{{ loans.pokok }}</strong></p>
  </div>
  <FPanel Id="loans" Columns="2" Label="Data Pinjaman">
    <FInput Id="plafon" Type="Number" Label="Plafon" Required="true" />
    <FInput Id="terpakai" Type="Number" Label="Terpakai" />
    <FInput Id="sisaPlafon" Type="Number" Label="Sisa Plafon" ReadOnly="true" CalculationFn="calculateSisaPlafon" ValidationFn="validateSisaPlafon" />
    <FInput Id="jenisAngsuran" Type="Combo" Label="Jenis Angsuran" Options="jenisAngsuranOptions" OnChange="onJenisAngsuranChange" />
    <FInput Id="pokok" Type="Number" Label="Pokok" />
    <FInput Id="bunga" Type="Number" Label="Bunga" />
    <FInput Id="totalAngsuran" Type="Number" Label="Total Angsuran" ReadOnly="true" CalculationFn="calculateTotalAngsuran" />
  </FPanel>
  <button Id="btnHitung" Type="button" Class="native-action" OnClick="hitungAngsuran">Hitung</button>
</FForm>`,script:`export default {
  calculations: {
    calculateSisaPlafon({ get }) {
      return (get('loans.plafon') || 0) - (get('loans.terpakai') || 0)
    },
    calculateTotalAngsuran({ get }) {
      return (get('loans.pokok') || 0) + (get('loans.bunga') || 0)
    },
  },

  validations: {
    validateSisaPlafon({ value }) {
      return value >= 0 || 'Pemakaian melebihi plafon'
    },
  },

  events: {
    async onJenisAngsuranChange({ value, form }) {
      if (value === 'flat') await form.setField('loans.bunga', 0)
    },
    async hitungAngsuran({ ui }) {
      await ui.toast('Perhitungan sudah reaktif', 'success')
    },
  },
}`,initialData:{plafon:1e8,terpakai:25e6,pokok:1e6,bunga:1e5},options:{"loans.jenisAngsuran":[{label:`Flat`,value:`flat`},{label:`Efektif`,value:`efektif`}]}};export{e as t};