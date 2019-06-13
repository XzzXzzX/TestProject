# hello-world
Hello world new project template.

CycleScrollView.ts 循环滚动窗组件。
实现滚动窗子节点循环，而不用创建太多子节点。
如，有1000条数据要添加到滚动窗显示，我们能看到的数据只有10条，如果是原生scrollview，那么创建1000个的子节点会出现明显的卡顿，
那么循环滚动窗组件，就可以只创建我们看到的节点数，如11个，然后在滚动时，移动子节点的位置，而不用去创建1000个子节点。


# 自定义log 2019-6-12 15:17:00
添加自定义log输出，包含：
1. 日志输出时间
2. 日志输出类及方法
3. 添加自定义输出配置(颜色配置，开关配置)
    ```
        /**
        * 日志cfg
        */
        static logConfig = {
            print1:{ bOpen: false, color: AppLog.logColor.Gray },
        }

        //...
        export function print1(msg: any) {
            AppLog.print(msg, "print1");
        }

    ```
4. 开关自定义日志
