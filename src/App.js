import Chip from './components/Chip';
import chips from './chips.json';

function App() {
  return (
    <>
      <Chip chip={chips[0]} />
    </>
  );
}

export default App;
