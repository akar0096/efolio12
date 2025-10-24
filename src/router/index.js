import { createRouter, createWebHashHistory } from 'vue-router'
import FirebaseSigninView from "@/views/FirebaseSigninView.vue"
import FirebaseRegisterView from "@/views/FirebaseRegisterView.vue"
import AdminLogin from '@/views/AdminLogin.vue'
import AdminReg from '@/views/AdminReg.vue'
import GetBookCountView from '@/views/GetBookCountView.vue'
import AddBookView from '@/views/AddBookView.vue'        // <-- import missing
import WeatherView from '@/views/WeatherView.vue'
import CountBookAPI from '@/views/CountBookAPI.vue'
import GetAllBookAPI from '@/views/GetAllBookAPI.vue'

// ... other imports

const routes = [
  { path: '/', redirect: '/firelogin' },
  { path: '/firelogin', name: 'FireLogin', component: FirebaseSigninView },
  { path: '/addbook', name: 'AddBook', component: AddBookView },
  { path: '/getallbookapi', name: 'GetAllBookAPI', component: GetAllBookAPI },
  { path: '/countbookapi', name: 'CountBookAPI', component: CountBookAPI },
  { path: '/getbookcountview', name: 'GetBookCountView', component: GetBookCountView },
  { path: '/weatherview', name: 'WeatherView', component: WeatherView },
  { path: '/fireregister', name: 'FireRegister', component: FirebaseRegisterView },
  { path: '/adminlogin', name: 'AdminLogin', component: AdminLogin },
  { path: '/adminreg', name: 'AdminReg', component: AdminReg }
]

const router = createRouter({
  history: createWebHashHistory('/35215704-efolio11-12/week9firebase/'),
  routes
})

export default router
