import './App.css'
import AppRoutes from './routes'
import AuthProvider from './providers/AuthProvider/AuthProvider'

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider> 
  )
}
export default App
