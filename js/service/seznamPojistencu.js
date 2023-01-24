class SeznamPojistencuService {


    constructor(seznam = []) {
        this._seznam = seznam
    }

    get seznam() {
        return this._seznam;
    }

    set seznam(value) {
        this._seznam = value;
    }

    editPojistenec(pojistenec) {
        const index = this._seznam.findIndex(x => x.id === pojistenec.id)
        if(index > -1) {
        this._seznam[index] = pojistenec
        const row = this.generateRow(this._seznam[index]);
        const oldRow = document.getElementById(pojistenec.id)
        document.getElementById('seznam-pojistencu-table').replaceChild(row, oldRow)
        } else {
            this.addPojistenec(pojistenec)
        }

    }

    addPojistenec(pojistenec) {
        pojistenec.id = crypto.randomUUID()
        this._seznam.push(pojistenec)
        const row = this.generateRow(this._seznam[this.pocetPojistencu() -1]);
        document.getElementById('seznam-pojistencu-table').appendChild(row)
    }

    upsertPojistenec(pojistenec) {
        if(pojistenec.id) {
            this.editPojistenec(pojistenec)
        } else {
            this.addPojistenec(pojistenec)
        }
        window.forms.removeForm();
    }

    removePojistenec(pojistenecId) {
        const pojistenec = this._seznam.find(x => x.id === pojistenecId)
        if (confirm('Opravdu chcete smazat pojištěnce ' + pojistenec.toString())) {
            this._seznam = this._seznam.filter(x => x.id !== pojistenecId)
            document.getElementById(pojistenecId).remove()
            if(this._seznam.length < 1) {
                this.drawTable()
            }
        }
    }

    pocetPojistencu() {
        return this._seznam.length
    }



    drawTable() {
        let table
        if (window.seznam.pocetPojistencu() > 0) {
            table = document.createElement('table')
            table.id = "seznam-pojistencu-table"
            const head = document.createElement('thead')
            head.innerHTML = "<th>Jméno</th><th>Příjmení</th><th>Věk</th><th>Telefon</th><th>Akce</th>"
            table.appendChild(head)
            for (let i = 0; i < window.seznam.pocetPojistencu(); i++) {
                const row = this.generateRow(this.seznam[i]);
                table.appendChild(row)
            }
        } else {
            table = document.createElement('p')
            table.id = "seznam-pojistencu-table"
            table.innerText = 'Neni uložen žádný pojištěnec'
        }
        const addPojistenecButton = document.createElement("button")
        addPojistenecButton.type = 'button'
        addPojistenecButton.className = 'btn'
        addPojistenecButton.id= 'add-button'
        addPojistenecButton.innerText = 'Nový pojištěnec'
        addPojistenecButton.onclick = function () {
            window.forms.drawEditForm(new Pojistenec())
        }
        document.getElementById('seznam-pojistencu-table')?.remove()
        document.getElementById('seznam-pojistencu').appendChild(table)
        if(document.getElementById('add-button') === null) {
            document.getElementById('seznam-pojistencu').appendChild(addPojistenecButton)
        }
        window.forms.removeForm();
    }

    generateRow(pojistenec) {
        const row = document.createElement('tr')
        row.id = pojistenec.id
        const jmeno = document.createElement('td')
        jmeno.innerText = pojistenec.jmeno
        const prijmeni = document.createElement('td')
        prijmeni.innerText = pojistenec.prijmeni
        const vek = document.createElement('td')
        vek.innerText = pojistenec.vek
        const telefon = document.createElement('td')
        telefon.innerText = pojistenec.telefon
        const actions = this.generateRowActions(pojistenec);
        row.append(jmeno, prijmeni, vek, telefon, actions)
        return row;
    }

    generateRowActions(pojistenec) {
        const actions = document.createElement('td')
        const editButton = document.createElement('button')
        editButton.type = "button"
        editButton.className = 'btn'
        editButton.innerText = "Editovat"
        editButton.onclick = function () {
            window.forms.drawEditForm(pojistenec)
        }
        const deleteButton = document.createElement('button')
        deleteButton.type = "button"
        deleteButton.className = 'btn'
        deleteButton.innerText = "Smazat"
        deleteButton.onclick = function () {
            window.seznam.removePojistenec(pojistenec.id)
        }
        actions.append(editButton,deleteButton)
        return actions;
    }
}
