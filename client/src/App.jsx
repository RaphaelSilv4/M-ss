import './App.css'
import AppRoutes from './routes'
import AuthProvider from './providers/AuthProvider/AuthProvider'
import  UserDataProvider  from './providers/AuthDataProvider/AuthDataProvider'

function App() {
  return (
    <UserDataProvider>
      <AuthProvider>
        <AppRoutes /> 
      </AuthProvider>
    </UserDataProvider>
  )
}
export default App
