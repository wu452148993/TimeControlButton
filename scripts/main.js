let cols = [Pal.lancerLaser, Pal.accent, Color.valueOf("cc6eaf")];

let v = 0;

function addTable(table){
    table.table(Tex.pane, t => {
        let bm = t.button("-",24,() => {
            if(v >= -8)
                v--;
            else
                v = 8;
            let time = Math.pow(2, v);
            Time.setDeltaProvider(() => Math.min(Core.graphics.getDeltaTime() * 60 * time, 3 * time));
            l.color(Tmp.c1.lerp(cols, (s.getValue() + 8) / 16));
        });
        
        let l = t.label(() => {
            if(v >= 0)
                return "x" + Math.pow(2, v);
            return "x1/" + Math.pow(2, Math.abs(v));
        }).growX().width(8.5 * 8).color(Pal.accent);
            
        let bp = t.button("-",24,() => {
            if(v <= 8)
                v--;
            else
                v = -8;
            let time = Math.pow(2, v);
            Time.setDeltaProvider(() => Math.min(Core.graphics.getDeltaTime() * 60 * time, 3 * time));
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
