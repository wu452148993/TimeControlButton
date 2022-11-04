let cols = [Pal.lancerLaser, Pal.accent, Color.valueOf("cc6eaf")];

function addTable(table){
    table.table(Tex.pane, t => {
        let s = new Slider(-8, 8, 1, false);
        s.setValue(0);
        let bt = t.button("-",24,() => s.setValue(s.getValue() - 1));
        let l = t.label(() => {
            let v = s.getValue();
            return "x2^" + v;
        }).growX().width(8.5 * 8).color(Pal.accent);
        let b = t.button(new TextureRegionDrawable(Icon.refresh), 24, () => s.setValue(0)).padLeft(6).get();
        b.getStyle().imageUpColor = Pal.accent;
        t.add(s).padLeft(0).minWidth(100);
        s.moved(v => {
            let t = Math.pow(2, v);
            Time.setDeltaProvider(() => Math.min(Core.graphics.getDeltaTime() * 60 * t, 3 * t));
            l.color(Tmp.c1.lerp(cols, (s.getValue() + 8) / 16));
        });
    });
    table.visibility = () => {
        if(!Vars.ui.hudfrag.shown || Vars.ui.minimapfrag.shown()) return false;
        if(!Vars.mobile) return true;
        
        let input = Vars.control.input;
        return input.lastSchematic == null || input.selectPlans.isEmpty();
    };
}

if(!Vars.headless){
    var tc = new Table();

    Events.on(ClientLoadEvent, () => {
        tc.bottom().left();
        addTable(tc);
        Vars.ui.hudGroup.addChild(tc);
        if(Vars.mobile) tc.moveBy(0, Scl.scl(46));
    });
}
