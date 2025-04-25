import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import { Signup } from './pages/Signup';
import { Signin } from './pages/Signin';
import Dashboard from './pages/Dashboard';
import { Sendmoney } from './pages/Sendmoney';
import { PaymentComplete } from './pages/PaymentComplete';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/signup" replace />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sendmoney" element={<Sendmoney />} />
          <Route path="/paymentcomplete" element={<PaymentComplete />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
