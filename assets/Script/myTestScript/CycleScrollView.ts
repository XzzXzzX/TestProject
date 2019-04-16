/**
 * xuan
 * 2019-4-16 11:22:37
 * 循环滚动窗
 */
const { ccclass, property } = cc._decorator;

@ccclass
export default class CycleScrollView extends cc.Component {

    //#region 成员
    /**
     * 滚动窗组件
     */
    @property(cc.ScrollView)
    scroll: cc.ScrollView = null;
    
    /**
     * 滚动窗遮罩节点
     */
    @property(cc.Node)
    nodeMask: cc.Node = null;

    /**
     * 滚动窗容器节点
     */
    @property(cc.Node)
    content: cc.Node = null;

    /**
     * 自动滚动时间
     */
    scrollTime: number = 0.5;

    /**
     * 滚动窗方向
     */
    @property
    isVertical: boolean = true;

    /**
     * 间距大小
     */
    @property({displayName:"子节点间距"})
    spacing: number = 0;
    
    /**
     * 子节点创建方法
     */
    createTemp: any = null;

    /**
     * 子节点刷新方法
     */
    refreshTemp: any = null;

    /**
     * 子节点
     */
    itemTemplateNode: cc.Node = null;

    /**
     * 子节点总数
     */
    totalItemNodeNum:number = 0;

    /**
     * 数据总数
     */
    totalItemDataNum:number = 0;

    /**
     * 节点数据列表
     */
    itemDatas: Array<any> = [];

    /**
     * 子节点列表
     */
    itemNodes: Array<cc.Node> = [];

    /**
     * 相邻子节点见的距离
     */
    itemDis: number = 0;

    /**
     * 可视的尺寸大小
     */
    visibleLength: number = 0;

    /**
     * content容器的最大长度
     */
    maxContentLength: number = 0;

    /**
     * 当前最小数据index
     */
    curMinDataIdx: number = 0;

    /**
     * 当前最大数据index
     */
    curMaxDataIdx: number = 0;

    //#endregion

    //#region life call

    onLoad () {
        
        // this.updateInterval = 0.2;
    }

    start () {
        // 监控滚动回调
        let eventHandler = new cc.Component.EventHandler();
        eventHandler.target = this.node;
        eventHandler.component = "CycleScrollView";
        eventHandler.handler = "onScroll";
        this.scroll.scrollEvents.push(eventHandler);
    }

    //#endregion

    //#region 内部方法

    /**
     * 滚动
     */
    onScroll()
    {
        let scrollOffset: cc.Vec2 = this.scroll.getScrollOffset();
        let offest = 0;
        if (this.isVertical)
        {
            offest = scrollOffset.y;
        }
        else
        {
            //水平的offset是负数，为什么会有这么sb的设计，将它取反和垂直方向的统一一下
            offest = -scrollOffset.x;
        }
        if (offest < 0 || offest + this.visibleLength > this.maxContentLength)
        {
            return;
        }
        this.curMinDataIdx =  Math.floor(offest / this.itemDis);
        let curDataIdx: number = 0;
        let items = this.itemNodes;
        for (let index = 0; index < items.length; index++) {
            let item = items[index];
            // 数据的index
            curDataIdx = this.curMinDataIdx + index;
            // 设置子节点的新的位置
            if (this.isVertical)
            {
                item.setPositionY(-this.itemTemplateNode.height / 2 - this.itemDis * curDataIdx);
            }
            else
            {
                item.setPositionX(this.itemTemplateNode.width / 2 + this.itemDis * curDataIdx);
                // cc.log("zx_ posX: ", item.x);
            }
            // 刷新子节点信息
            this.refreshTemp(item, this.itemDatas[curDataIdx]);
        }
        this.curMaxDataIdx =  this.curMinDataIdx + items.length;
    }

    //#endregion

    //#region 公共方法

    /**
     * 设置滚动窗相关模板方法
     * @param createTemp 子节点创建方法
     * @param refreshTemp 子节点刷新方法
     */
    public setTemplates(createTemp: any, refreshTemp: any): void
    {
        this.createTemp = createTemp;
        this.refreshTemp = refreshTemp;

        this.itemTemplateNode = this.createTemp();
    }

    /**
     * 设置滚动窗数据
     * @param datas 滚动窗数据
     */
    public setData(datas: Array<any>): void
    {
        this.content.removeAllChildren();
        this.itemNodes = [];
        this.itemDatas = datas;
        this.totalItemDataNum = datas.length;
        if (this.itemTemplateNode)
        {
            if (this.isVertical)
            {
                this.itemDis = this.itemTemplateNode.height + this.spacing;
                this.visibleLength = this.nodeMask.height;
                this.content.height = this.totalItemDataNum * this.itemDis + this.spacing;
                this.maxContentLength = this.content.height;
            }
            else
            {
                this.itemDis = this.itemTemplateNode.width + this.spacing;
                this.visibleLength = this.nodeMask.width;
                this.content.width = this.totalItemDataNum * this.itemDis + this.spacing;
                this.maxContentLength = this.content.width;
            }
            this.totalItemNodeNum = parseInt((this.visibleLength / this.itemDis).toString()) + 2;

            // 使用创建模板方法，创建子节点
            for (let index = 0; index < this.totalItemNodeNum; index++) {
                if (this.createTemp)
                {
                    let itemNode:cc.Node = this.createTemp();                
                    this.content.addChild(itemNode);
                    if (this.isVertical)
                    {
                        itemNode.setPosition(0, -this.itemTemplateNode.height * 0.5 - this.itemDis * index);
                    }
                    else
                    {
                        itemNode.setPosition(this.itemTemplateNode.width * 0.5 + this.itemDis * index, 0);
                    }

                    if (this.refreshTemp)
                    {
                        this.refreshTemp(itemNode, this.itemDatas[index]);
                    }
                    this.itemNodes.push(itemNode);
                }
            }
        }
    }

    /**
     * 滚动到指定数据index
     * @param index 数据index
     */
    public scrollToIndex(index: number): void
    {
        if (index > this.totalItemDataNum)
            index = this.totalItemDataNum;
        let percent: number = index / this.totalItemDataNum;
        if (this.isVertical)
        {
            if (percent >= 1)
            {
                this.scroll.scrollToBottom(this.scrollTime);
            }
            else if (percent <= 0)
            {
                this.scroll.scrollToTop(this.scrollTime);
            }
            else
            {
                this.scroll.scrollToPercentVertical(percent, this.scrollTime);
            }
        }
        else
        {
            this.scroll.scrollToPercentHorizontal(percent, this.scrollTime);
            if (percent >= 1)
            {
                this.scroll.scrollToRight();
            }
            else
            {
                this.scroll.scrollToLeft();
            }
        }
    }

    /**
     * 滚动到指定百分比
     * @param index 数据index
     */
    public scrollToPercent(percent: number): void
    {
        if (this.isVertical)
        {
            this.scroll.scrollToPercentVertical(percent, this.scrollTime);
        }
        else
        {
            this.scroll.scrollToPercentHorizontal(percent, this.scrollTime);
        }
    }


    //#endregion
}