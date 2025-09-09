/*
 * @Description:
 * @version: v1.0.0
 * @Author: GaoMingze
 * @Date: 2025-08-30 09:46:38
 * @LastEditors: GaoMingze
 * @LastEditTime: 2025-09-07 00:23:18
 */
// routeTitleMap.ts
export const routeTitleMap: Record<string, (route: any) => string> = {
    '/home': () => '主页',
    '/team': () => '队伍',
    '/user': () => '个人',
    '/search': () => '搜索',
    '/setting': () => '设置',
    '/team/add': () => '创建队伍',
    '/user/edit': (route) => {
        // query 动态生成标题
        return route.query.title ? `${route.query.title}` : '编辑用户信息'
    },
}
