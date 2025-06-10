import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [currentBtn, setCurrentBtn] = useState('biblia');
  const [now, setNow] = useState(Date.now());

  const amigos = '1584139208';
  const namorados = '1749336008';

  const [theDay, setTheDay] = useState(amigos);

  useEffect(() => {
    setInterval(() => {
      setNow(Date.now());
    }, 10);
  }, []);

  const date = Number(theDay + '000');
  const diference = Number(now) - Number(date);

  const getTime = (diference: number) => {
    const seconds = Math.floor(diference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(weeks / 4);
    const years = Math.floor(days / 365);

    return {
      seconds,
      minutes,
      hours,
      days,
      weeks,
      months,
      years
    };
  };

  const { seconds, minutes, hours, days, weeks, months, years } =
    getTime(diference);

  // const time = (semanas: number): string => {
  //   const months = Math.floor(semanas / 4);
  //   const fMonths = Math.floor(months % 12);
  //   const anos = Math.floor(months / 12);
  //   return `${anos} anos ${fMonths} meses`;
  // };

  return (
    <div className='container'>
      <main className='main'>
        <section className='images-container'>
          <div className='first-content'>
            <div className='main-images'>
              <div className='main-images-content'>
                <picture>
                  <img
                    src='https://images.pexels.com/photos/2145/sea-sunset-beach-couple.jpg?auto=compress&cs=tinysrgb&w=300'
                    alt=''
                  />
                </picture>{' '}
                <picture>
                  <img
                    src='https://images.pexels.com/photos/2145/sea-sunset-beach-couple.jpg?auto=compress&cs=tinysrgb&w=300'
                    alt=''
                  />
                </picture>{' '}
                <picture>
                  <img
                    src='https://images.pexels.com/photos/2145/sea-sunset-beach-couple.jpg?auto=compress&cs=tinysrgb&w=300'
                    alt=''
                  />
                </picture>{' '}
                <picture>
                  <img
                    src='https://images.pexels.com/photos/2145/sea-sunset-beach-couple.jpg?auto=compress&cs=tinysrgb&w=300'
                    alt=''
                  />
                </picture>{' '}
                <picture>
                  <img
                    src='https://images.pexels.com/photos/2145/sea-sunset-beach-couple.jpg?auto=compress&cs=tinysrgb&w=300'
                    alt=''
                  />
                </picture>{' '}
                <picture>
                  <img
                    src='https://images.pexels.com/photos/2145/sea-sunset-beach-couple.jpg?auto=compress&cs=tinysrgb&w=300'
                    alt=''
                  />
                </picture>
              </div>
            </div>
            <div className='vertical-carousel'>
              <div className='vertical-carousel-content'>
                <picture>
                  <img
                    src='https://images.pexels.com/photos/2145/sea-sunset-beach-couple.jpg?auto=compress&cs=tinysrgb&w=300'
                    alt=''
                  />
                </picture>{' '}
                <picture>
                  <img
                    src='https://images.pexels.com/photos/2145/sea-sunset-beach-couple.jpg?auto=compress&cs=tinysrgb&w=300'
                    alt=''
                  />
                </picture>{' '}
                <picture>
                  <img
                    src='https://images.pexels.com/photos/2145/sea-sunset-beach-couple.jpg?auto=compress&cs=tinysrgb&w=300'
                    alt=''
                  />
                </picture>{' '}
                <picture>
                  <img
                    src='https://images.pexels.com/photos/2145/sea-sunset-beach-couple.jpg?auto=compress&cs=tinysrgb&w=300'
                    alt=''
                  />
                </picture>{' '}
                <picture>
                  <img
                    src='https://images.pexels.com/photos/2145/sea-sunset-beach-couple.jpg?auto=compress&cs=tinysrgb&w=300'
                    alt=''
                  />
                </picture>{' '}
                <picture>
                  <img
                    src='https://images.pexels.com/photos/2145/sea-sunset-beach-couple.jpg?auto=compress&cs=tinysrgb&w=300'
                    alt=''
                  />
                </picture>{' '}
                <picture>
                  <img
                    src='https://images.pexels.com/photos/2145/sea-sunset-beach-couple.jpg?auto=compress&cs=tinysrgb&w=300'
                    alt=''
                  />
                </picture>{' '}
                <picture>
                  <img
                    src='https://images.pexels.com/photos/2145/sea-sunset-beach-couple.jpg?auto=compress&cs=tinysrgb&w=300'
                    alt=''
                  />
                </picture>
              </div>
            </div>
          </div>
          <div className='second-images-line'>
            <div className='second-images-line-content'>
              <picture>
                <img
                  src='https://images.pexels.com/photos/2145/sea-sunset-beach-couple.jpg?auto=compress&cs=tinysrgb&w=300'
                  alt=''
                />
              </picture>
              <picture>
                <img
                  src='https://images.pexels.com/photos/2145/sea-sunset-beach-couple.jpg?auto=compress&cs=tinysrgb&w=300'
                  alt=''
                />
              </picture>
              <picture>
                <img
                  src='https://images.pexels.com/photos/2145/sea-sunset-beach-couple.jpg?auto=compress&cs=tinysrgb&w=300'
                  alt=''
                />
              </picture>
              <picture>
                <img
                  src='https://images.pexels.com/photos/2145/sea-sunset-beach-couple.jpg?auto=compress&cs=tinysrgb&w=300'
                  alt=''
                />
              </picture>
              <picture>
                <img
                  src='https://images.pexels.com/photos/2145/sea-sunset-beach-couple.jpg?auto=compress&cs=tinysrgb&w=300'
                  alt=''
                />
              </picture>
              <picture>
                <img
                  src='https://images.pexels.com/photos/2145/sea-sunset-beach-couple.jpg?auto=compress&cs=tinysrgb&w=300'
                  alt=''
                />
              </picture>
            </div>
          </div>
        </section>
        <section className='notes-container'>
          <div className='notes'>
            <div className='content'>
              {currentBtn === 'notas' && (
                <>
                  <div>Notas</div>
                  <div>Notas</div>
                  <div>Notas</div>
                  <div>Notas</div>
                  <div>Notas</div>
                  <div>Notas</div>
                  <div>Notas</div>
                  <div>Notas</div>
                  <div>Notas</div>
                  <div>Notas</div>
                </>
              )}
              {currentBtn === 'biblia' && (
                <>
                  <div>Biblia</div>
                  <div>Biblia</div>
                  <div>Biblia</div>
                  <div>Biblia</div>
                  <div>Biblia</div>
                  <div>Biblia</div>
                  <div>Biblia</div>
                  <div>Biblia</div>
                  <div>Biblia</div>
                  <div>Biblia</div>
                </>
              )}
              {currentBtn === 'filmes' && (
                <>
                  <div>Filmes</div>
                  <div>Filmes</div>
                  <div>Filmes</div>
                  <div>Filmes</div>
                  <div>Filmes</div>
                  <div>Filmes</div>
                  <div>Filmes</div>
                  <div>Filmes</div>
                  <div>Filmes</div>
                  <div>Filmes</div>
                </>
              )}
            </div>
          </div>
          <div className='actions'>
            <button
              style={{ scale: currentBtn === 'notas' ? 1.2 : '' }}
              onClick={() => setCurrentBtn('notas')}
            >
              Notas
            </button>
            <button
              style={{ scale: currentBtn === 'biblia' ? 1.2 : '' }}
              onClick={() => setCurrentBtn('biblia')}
            >
              Bíblia
            </button>
            <button
              style={{ scale: currentBtn === 'filmes' ? 1.2 : '' }}
              onClick={() => setCurrentBtn('filmes')}
            >
              Filmes
            </button>
          </div>
        </section>
      </main>
      {/* {time(weeks)} */}
      <div className='days-container'>
        {years} anos | {months} meses | {new Intl.NumberFormat().format(weeks)}{' '}
        semanas | {new Intl.NumberFormat().format(days)} dias |{' '}
        {new Intl.NumberFormat().format(hours)} horas |{' '}
        {new Intl.NumberFormat().format(minutes)} minutos |{' '}
        {new Intl.NumberFormat().format(seconds)} segundos
      </div>
      <div className='switch-container'>
        <label>
          Amigos
          <input
            type='radio'
            value={amigos}
            checked={theDay === amigos}
            onChange={(e) => setTheDay(e.target.value)}
          />
        </label>
        <label>
          Namorados
          <input
            type='radio'
            value={namorados}
            checked={theDay === namorados}
            onChange={(e) => setTheDay(e.target.value)}
          />
        </label>
      </div>
    </div>
  );
}

export default App;
