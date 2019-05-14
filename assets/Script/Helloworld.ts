const {ccclass, property} = cc._decorator;

@ccclass
export default class Helloworld extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    start () {
        // init logic
        this.label.string = this.text;
        this.label.node.scale = 0.5;
        cc.log("zx_ ", this.label.node.scale, this.node.scaleX,this.node.scaleY);
    }
}
