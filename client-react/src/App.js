import './App.css';
import IMDb from 'imdb-light';

function fetch(id) {
  return new Promise(function (resolve, reject) {
          IMDb.fetch(id, (details) => {
                  resolve(details);
          });
  });
}

async function test(id) {
  var quote = await fetch(id);
  console.log(quote.Title);
}

test('tt7097896');

function App() {
  
  return (
    <div className="App">
      <header className="App-header">
        Hello World...
      </header>
    </div>
  );
}

export default App;
