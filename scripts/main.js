let cols = [Pal.lancerLaser, Pal.accent, Color.valueOf("cc6eaf")];

let v = 0;

function addTable(table){
    table.table(Tex.pane, t => {
        let bm = t.button("-", () => {
            if(v > -8)
                v--;
            else
                v = 8;
            Time.setDeltaProvider(() => Math.min(Core.graphics.getDeltaTime() * 60 * Math.pow(2, v), 3 * Math.pow(2, v)));
            l.color(Tmp.c1.lerp(cols, (v + 8) / 16));
        }).minWidth(50).get();
        
        let l = t.label(() => {
            if(v >= 0)
                return "x" + Math.pow(2, v);
            else
                return "x1/" + Math.pow(2, Math.abs(v));
        }).growX().width(8.5 * 8).color(Pal.accent);
        
        let bp = t.button("+", () => {
            if(v < 8)
                v++;
            else
                v = -8;
            Time.setDeltaProvider(() => Math.min(Core.graphics.getDeltaTime() * 60 * Math.pow(2, v), 3 * Math.pow(2, v)));
            l.color(Tmp.c1.lerp(cols, (v + 8) / 16));
        }).padLeft(6).get();
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
