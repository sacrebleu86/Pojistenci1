    window.forms = new FormsService()
    window.seznam = new SeznamPojistencuService()
    init()
    function init() {
        loremIpsum()
        seznam.drawTable()
    }

    function loremIpsum() {
        seznam.addPojistenec(new Pojistenec("Jan", "Zlámaný", 38, "+420605111555"))
        seznam.addPojistenec(new Pojistenec("Petra", "Chorá", 24, "+420605189557"))
        seznam.addPojistenec(new Pojistenec("Ladislav", "Skočil", 45, "+420777333222"))
        seznam.addPojistenec(new Pojistenec("Jan", "Zlamaný", 78, "+42067158957"))
    }


