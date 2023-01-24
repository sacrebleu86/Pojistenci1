class Pojistenec {

  get id() {
    return this._id;
  }

  set id(id) {
    this._id = id;
  }

  get jmeno() {
    return this._jmeno;
  }

  set jmeno(value) {
    this._jmeno = value;
  }

  get prijmeni() {
    return this._prijmeni;
  }

  set prijmeni(value) {
    this._prijmeni = value;
  }

  get vek() {
    return this._vek;
  }

  set vek(value) {
    this._vek = value;
  }

  get telefon() {
    return this._telefon;
  }

  set telefon(value) {
    this._telefon = value;
  }


  constructor(jmeno, prijmeni, vek, telefon) {
    this._jmeno = jmeno;
    this._prijmeni = prijmeni;
    this._vek = vek;
    this._telefon = telefon;
  }

  toString() {
      return [
          this._jmeno,
          this.prijmeni,
          '(' + this._vek + ')'
      ].join(' ')
  }


}
