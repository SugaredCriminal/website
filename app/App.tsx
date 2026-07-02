import { BrowserRouter, Routes, Route } from 'react-router';
import { Navigation } from './components/Navigation';
import { HomePage } from './components/HomePage';
import { StayInLoop } from './components/StayInLoop';
import { CollectiveLearnMore } from './components/CollectiveLearnMore';

export default function App() {
  return (
    <div className="min-h-screen bg-[#0c0b09]">
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/apps" element={<StayInLoop />} />
          <Route path="/collective" element={<CollectiveLearnMore />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}