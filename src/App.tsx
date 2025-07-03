import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Header from './components/Layout/Header';
import Login from './pages/Auth/Login';
import AdminDashboard from './pages/Dashboard/AdminDashboard';
import DeveloperDashboard from './pages/Dashboard/DeveloperDashboard';
import NotFound from './pages/notfound/notfound';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute roles={['admin']} />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>
          <Route element={<ProtectedRoute roles={['developer']} />}>
            <Route path="/developer" element={<DeveloperDashboard />} />
          </Route>
          <Route path="/" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;