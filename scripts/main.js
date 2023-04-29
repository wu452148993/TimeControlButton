let v = 0;

function addTable(table){
    table.table(Tex.pane, t => {
        let bm = t.button("<", () => {
            if(v > -5)
                v--;
            Time.setDeltaProvider(() => Math.min(Core.graphics.getDeltaTime() * 60 * Math.pow(2, v), 3 * Math.pow(2, v)));
        }).width(44).get();
        let l = t.label(() => {
            if(v >= 0)
                return "x" + Math.pow(2, v);
            else
                return "x1/" + Math.pow(2, Math.abs(v));
        }).growX().width(8.5 * 7);
        let bp = t.button(">", () => {
            if(v < 5)
                v++;
            Time.setDeltaProvider(() => Math.min(Core.graphics.getDeltaTime() * 60 * Math.pow(2, v), 3 * Math.pow(2, v)));
        }).padLeft(6).width(44).get();
        let reset = t.button("1", () => {
            v = 0;
            Time.setDeltaProvider(() => Math.min(Core.graphics.getDeltaTime() * 60 * Math.pow(2, v), 3 * Math.pow(2, v)));
        }).padLeft(1).width(44).get();
    });
    table.top().left();
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
        addTable(tc);
        var marker = Vars.ui.hudGroup.find("overlaymarker").find("waves/editor");
        marker.stack(tc);
    });
}
