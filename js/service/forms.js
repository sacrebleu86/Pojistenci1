class FormsService {

    drawEditForm(pojistenec, self = this) {
        this.pojistenec = pojistenec
        this.form = document.createElement('form');
        this.form.onsubmit = self.submit
        const nadpis = this.pojistenec?.id ? 'Editace pojištěnce ' + this.pojistenec.toString() : "Nový pojištěnec"
        this.form.action = '#'
        this.form.id = 'form-pojistenec'
        this.createLegend(nadpis);
        this.createFields()
        this.createButtons()
        this.removeForm()
        document.getElementById('form-wrapper').append(this.form)
    }

    removeForm() {
        document.getElementById('form-pojistenec')?.remove()
    }

    createLegend(nadpis) {
        const legend = document.createElement('legend')
        legend.innerText = nadpis
        this.form.appendChild(legend)
    }

    createFields() {
        const id = this.createInput({id: 'id', type: 'hidden'})
        const jmenoField = this.createInput({id: 'jmeno', required: 'required', type: 'text'}, 'Jméno')
        const prijmeniField = this.createInput({id: 'prijmeni', required: 'required', type: 'text'}, 'Příjmení')
        const vekField = this.createInput(
            {id: 'vek', required: 'required', type: 'number', min: 0, max: 110},
            'Věk'
        )
        const telefonField = this.createInput({id: 'telefon', required: 'required', type: 'tel'}, 'Telefon')
        this.form.append(id, jmenoField, prijmeniField, vekField, telefonField)
    }


    createButtons() {
        const buttons = document.createElement('div')
        buttons.id = "form-pojistenec-buttons"
        buttons.append(
            this.generateButtonSave(),
            this.generateButtonReset(),
            this.generateButtonCancel()
        )
        this.form.appendChild(buttons)
    }

    generateButtonCancel(self = this) {
        const buttonCancel = document.createElement('button')
        buttonCancel.type = 'button'
        buttonCancel.className = 'btn'
        buttonCancel.onclick = function () {
            self.removeForm()
        }
        buttonCancel.innerText = 'Zrušit'
        return buttonCancel
    }

    generateButtonReset() {
        const buttonReset = document.createElement('button')
        buttonReset.type = 'reset'
        buttonReset.innerText = 'Vyprázdnit'
        buttonReset.className = 'btn'
        return buttonReset;
    }

    generateButtonSave(sel = this) {
        const buttonSave = document.createElement('button')
        buttonSave.type = 'submit'
        buttonSave.innerText = 'Uložit'
        buttonSave.className = 'btn'
        return buttonSave
    }

    createInput(inputAttrs, labelText) {
        const wrapper = document.createElement('div')
        const label = document.createElement('label')
        label.innerText = labelText

        const input = document.createElement('input')
        const attrsKeys = Object.keys(inputAttrs)
        for (let i = 0; i < attrsKeys.length; i++) {
            input[attrsKeys[i]] = inputAttrs[attrsKeys[i]]
        }
        input.value = this.pojistenec[inputAttrs.id] || ''
        if (labelText) {
            wrapper.appendChild(label)
        }
        wrapper.appendChild(input)
        return wrapper;
    }

    submit(event) {
        event.preventDefault()
        event.stopPropagation()
        const pojistenec = new pojistenec()
        pojistenec.id = document.getElementById('id').value
        pojistenec.jmeno = document.getElementById('jmeno').value
        pojistenec.prijmeni = document.getElementById('prijmeni').value
        pojistenec.vek = document.getElementById('vek').value
        pojistenec.telefon = document.getElementById('telefon').value
        seznam.upsertPojistenec(pojistenec)
    }
}
