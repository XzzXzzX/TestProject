
const {ccclass, property} = cc._decorator;

/**
 * xuan
 * 2019-5-13 16:17:29
 * 资源管理
 */

 export enum AssetPath 
 {
    Egg = "res/prefab/ArcEgg",
    Box20 = "res/prefab/Box20",
    Box40 = "res/prefab/Box40",
    Box80 = "res/prefab/Box80",
    Box80S = "res/prefab/Box80S",
    Circle20 = "res/prefab/Circle20",
    Circle40 = "res/prefab/Circle40",
    Circle80 = "res/prefab/Circle80",
    Platform160 = "res/prefab/Platform160",
    Platform320 = "res/prefab/Platform320",
    Triangle20 = "res/prefab/Triangle20",
    star = "res/prefab/star",
 }

@ccclass
export default class AssetManager {
    private static _instance: AssetManager = null;

    /**
     * 需要预先加载的预制件
     */
    private assetList = [
        "res/prefab/ArcEgg",
        "res/prefab/Box20",
        "res/prefab/Box40",
        "res/prefab/Box80",
        "res/prefab/Box80S",
        "res/prefab/Circle20",
        "res/prefab/Circle40",
        "res/prefab/Circle80",
        "res/prefab/Platform160",
        "res/prefab/Platform320",
        "res/prefab/Triangle20",
        "res/prefab/star",
    ];

    public static getInstance(): AssetManager
    {
        if (null == this._instance)
        {
            this._instance = new AssetManager();
        }
        return this._instance;
    }

    /**
     * 预先资源加载
     * @param loadProcessCB 加载进度回调
     * @param loadFinishCb 加载完成回调
     */
    public preLoadAsset(loadProcessCB?:any, loadFinishCb?:any): void
    {
        let curNum: number = 0;
        let totalNum: number = this.assetList.length;
        for (let index = 0; index < this.assetList.length; index++) {
            cc.loader.loadResArray(this.assetList, cc.Prefab, ():void=>{}, (error:any,assets:any):void=>
            {
                if (error)
                {
                    cc.error("zx_ load res error: ", error);
                    return; 
                }
                curNum += 1;
                if (loadProcessCB)
                {
                    loadProcessCB(curNum, totalNum);
                }
                if (loadFinishCb)
                {
                    loadFinishCb();
                }
            });
        }

    }

}
