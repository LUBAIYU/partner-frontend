// 定义一些路由
// 每个路由都需要映射到一个组件。
import Index from "../pages/Index.vue";
import TeamPage from "../pages/TeamPage.vue";
import UserPage from "../pages/UserPage.vue";
import SearchPage from "../pages/SearchPage.vue";
import UserEditPage from "../pages/UserEditPage.vue";
import SearchResultPage from "../pages/SearchResultPage.vue";
import UserLoginPage from "../pages/UserLoginPage.vue";
import TeamAddPage from "../pages/TeamAddPage.vue";
import TeamUpdatePage from "../pages/TeamUpdatePage.vue";
import UserTeamCreatePage from "../pages/UserTeamCreatePage.vue";
import UserTeamJoinPage from "../pages/UserTeamJoinPage.vue";
import UserInfoPage from "../pages/UserInfoPage.vue";


const routes = [
    {path: '/', title: '主页', component: Index},
    {path: '/team', title: '找队伍', component: TeamPage},
    {path: '/user', title: '个人', component: UserPage},
    {path: '/search', title: '搜索', component: SearchPage},
    {path: '/user/info', title: '个人信息', component: UserInfoPage},
    {path: '/user/edit', title: '编辑信息', component: UserEditPage},
    {path: '/user/search/result', title: '搜索结果', component: SearchResultPage},
    {path: '/user/login', title: '用户登录', component: UserLoginPage},
    {path: '/team/add', title: '创建队伍', component: TeamAddPage},
    {path: '/team/update', title: '更新队伍', component: TeamUpdatePage},
    {path: '/team/my/create', title: '我创建的队伍', component: UserTeamCreatePage},
    {path: '/team/my/join', title: '我加入的队伍', component: UserTeamJoinPage}
]

export default routes;