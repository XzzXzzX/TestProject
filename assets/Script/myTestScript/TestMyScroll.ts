import MyScrollView from "./MyScrollView";
import CycleScrollView from "./CycleScrollView";

// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class TestMyScroll extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    @property(cc.Node)
    item: cc.Node = null;

    @property(MyScrollView)
    scroll: MyScrollView = null;

    @property(CycleScrollView)
    vScroll: CycleScrollView = null;
    
    @property(CycleScrollView)
    hScroll: CycleScrollView = null;

    @property(cc.Button)
    btn1: cc.Button = null;

    @property(cc.Button)
    btn2: cc.Button = null;

    @property(cc.Button)
    btn3: cc.Button = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.item;
    }

    start () {

        this.btn1.node.on('click', this.onBtn1Click, this);
        this.btn2.node.on('click', this.onBtn2Click, this);
        this.btn3.node.on('click', this.onBtn3Click, this);

        // this.scroll.setTemplates(this.createNode, this.refreshNode);
        this.vScroll.setTemplates(this.createNode, this.refreshNode);
        
        let arr: Array<number> = [];
        for (let index = 0; index < 100 ; index++) {
            arr.push(index);
        }
        // this.scroll.setData(arr);
        this.vScroll.setData(arr);
        // this.scroll.setTemplates(this.createNode, this.refreshNode);

        this.hScroll.setTemplates(this.createNode1, this.refreshNode1);
        let arr1: Array<number> = [];
        for (let index = 0; index < 100 ; index++) {
            arr1.push(index);
        }
        this.hScroll.setData(arr1);

    }

    onBtn1Click(event: cc.Event.EventCustom): void
    {
        cc.log("zx_ btn1");
        this.vScroll.scrollToIndex(100);
    }
    
    onBtn2Click(event: cc.Event.EventCustom): void
    {
        cc.log("zx_ btn2");
        this.vScroll.scrollToPercent(0.5);
    }

    onBtn3Click(event: cc.Event.EventCustom): void
    {
        cc.log("zx_ btn3");
        this.hScroll.scrollToPercent(0.5);

    }

    static nodeName: number = 0;
    createNode(): cc.Node
    {
        // let node: cc.Node = cc.instantiate(this.item);
        this.item;
        let node: cc.Node = new cc.Node();
        node.setContentSize(cc.size(150, 40));
        let lab:cc.Label = node.addComponent(cc.Label);
        TestMyScroll.nodeName++;
        node.name = "node" + TestMyScroll.nodeName;
        
        return node;
    }

    refreshNode(node:cc.Node, itemData: any): void
    {
        let lab:cc.Label = node.getComponent(cc.Label);
        // let lab:cc.Label = node.getChildByName("New Label").getComponent(cc.Label);
        if (lab)
        {
            lab.string = itemData;
        }
        // cc.log("zx_ node, itemdata", node.name, itemData);
    }

    createNode1(): cc.Node
    {
        // let node: cc.Node = cc.instantiate(this.item);
        let node: cc.Node = new cc.Node();
        node.setContentSize(cc.size(40, 150));
        let lab:cc.Label = node.addComponent(cc.Label);
        TestMyScroll.nodeName++;
        node.name = "node" + TestMyScroll.nodeName;
        
        return node;
    }

    refreshNode1(node:cc.Node, itemData: any): void
    {
        let lab:cc.Label = node.getComponent(cc.Label);
        // let lab:cc.Label = node.getChildByName("New Label").getComponent(cc.Label);
        if (lab)
        {
            lab.string = itemData;
        }
        // cc.log("zx_ node, itemdata", node.name, itemData);
    }

    // update (dt) {}
}
