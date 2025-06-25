import { useEffect, useState } from 'react';
import './App.css';
import { FaFilm, FaNoteSticky } from 'react-icons/fa6';
import axios from 'axios';
import { uploadImage } from './services/upload';
import imageCompression from 'browser-image-compression';
import { PuffLoader } from 'react-spinners';
import { FaBible, FaPlusCircle } from 'react-icons/fa';

interface Verse {
  version: string;
  abbrev: string;
  chapter: number;
  number: number;
  text: string;
  name: string;
}

interface BookProps {
  name: string;
  abbrev: abbrevProps;
  chapters: number;
}

interface abbrevProps {
  pt: string;
}

interface sVersesRequest {
  book: BookProps;
  chapter: {
    number: number;
  };
  verses: sVersesProps[];
}

interface sVersesProps {
  number: number;
  text: string;
}

interface BookOpenProps extends BookProps {
  index: number;
}

const text =
  ' Sessão dedicada para anotações sobre nós, versículos que achar legais e filmes para assistir';

const versions = [
  {
    version: 'acf',
    pt_verse: 'acf',
    verses: 31106
  },
  {
    version: 'kjv',
    pt_version: 'kjv',
    verses: 31101
  },
  {
    version: 'nvi',
    pt_version: 'nvi',
    verses: 31105
  },
  {
    version: 'ra',
    pt_version: 'ara',
    verses: 31104
  }
];

const getPtVersion = (version: string): string => {
  switch (version) {
    case 'acf':
      return 'acf';
    case 'kjv':
      return 'kjv';
    case 'nvi':
      return 'nvi';
    case 'ra':
      return 'ara';
    default:
      return 'nvi';
  }
};

type ImageType = {
  url: string;
};

function App() {
  const [currentBtn, setCurrentBtn] = useState('biblia');
  const [now, setNow] = useState(Date.now());
  const [seeBackground, setSeeBackground] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [openForm, setOpenForm] = useState({ state: false, type: 'bible' });
  const [verses, setVerses] = useState<Verse[]>([]);
  const [books, setBooks] = useState<BookProps[]>([]);
  const [bookOpen, setBookOpen] = useState<BookOpenProps>();
  const [searchedVerses, setSearchedVerses] = useState<sVersesRequest>();
  const [sVersion, setSVersion] = useState('nvi');
  const [sAbbrev, setSAbbrev] = useState('');
  const [verse, setVerse] = useState<sVersesProps>();
  const [imageFile, setImageFile] = useState<File[] | null>(null);
  const [images, setImages] = useState<ImageType[]>();

  const [img0, setImg0] = useState(0);
  const [img1, setImg1] = useState(0);
  const [img2, setImg2] = useState(0);
  const [img3, setImg3] = useState(0);
  const [img4, setImg4] = useState(0);
  const [img5, setImg5] = useState(0);
  const [img6, setImg6] = useState(0);
  const [img7, setImg7] = useState(0);
  const [img8, setImg8] = useState(0);
  const [img9, setImg9] = useState(0);
  const [img10, setImg10] = useState(0);
  const [img11, setImg11] = useState(0);
  const [img12, setImg12] = useState(0);
  const [img13, setImg13] = useState(0);
  const [img14, setImg14] = useState(0);
  const [img15, setImg15] = useState(0);
  const [img16, setImg16] = useState(0);
  const [img17, setImg17] = useState(0);
  const [img18, setImg18] = useState(0);
  const [img19, setImg19] = useState(0);

  const [firstLoading, setFirstLoading] = useState(true);

  const amigos = '1584139208';
  const namorados = '1749336008';

  const [theDay, setTheDay] = useState(amigos);

  useEffect(() => {
    setInterval(() => {
      setNow(Date.now());
    }, 10);
  }, []);

  useEffect(() => {
    if (loading || firstLoading) return;
    setInterval(() => {
      setTypedText((prev) => {
        if (prev.length < text.length) {
          return text.slice(0, prev.length + 1);
        }
        return prev;
      });
    }, 100);
  }, [firstLoading, loading]);

  useEffect(() => {
    firstLoad();
    loadImages();
    loadBooks();
    getVerses();
  }, []);

  const firstLoad = () => {
    setTimeout(() => {
      setFirstLoading(false);
    }, 5000);
  };

  useEffect(() => {
    const intervalId = setInterval(
      () => {
        // for(let i = 0; i <= images.length; i++){
        //   imagesA.push(Math.floor(Math.random() * images.length))
        // }

        if (!images) return;
        setImg0(Math.floor(Math.random() * images.length));
        setImg1(Math.floor(Math.random() * images.length));
        setImg2(Math.floor(Math.random() * images.length));
        setImg3(Math.floor(Math.random() * images.length));
        setImg4(Math.floor(Math.random() * images.length));
        setImg5(Math.floor(Math.random() * images.length));
        setImg6(Math.floor(Math.random() * images.length));
        setImg7(Math.floor(Math.random() * images.length));
        setImg8(Math.floor(Math.random() * images.length));
        setImg9(Math.floor(Math.random() * images.length));
        setImg10(Math.floor(Math.random() * images.length));
        setImg11(Math.floor(Math.random() * images.length));
        setImg12(Math.floor(Math.random() * images.length));
        setImg13(Math.floor(Math.random() * images.length));
        setImg14(Math.floor(Math.random() * images.length));
        setImg15(Math.floor(Math.random() * images.length));
        setImg16(Math.floor(Math.random() * images.length));
        setImg17(Math.floor(Math.random() * images.length));
        setImg18(Math.floor(Math.random() * images.length));
        setImg19(Math.floor(Math.random() * images.length));
      },
      firstLoading ? 1000 : 5000
    );

    return () => clearInterval(intervalId);
  }, []);

  const date = Number(theDay + '000');
  // const diference = Number(now) - Number(date);

  // const getTime = (diference: number) => {
  //   const seconds = Math.floor(diference / 1000);
  //   const minutes = Math.floor(seconds / 60);
  //   const hours = Math.floor(minutes / 60);
  //   const days = Math.floor(hours / 24);
  //   const weeks = Math.floor(days / 7);
  //   const months = Math.floor(weeks / 4);
  //   const years = Math.floor(days / 365);

  //   return {
  //     seconds,
  //     minutes,
  //     hours,
  //     days,
  //     weeks,
  //     months,
  //     years
  //   };
  // };

  const timeObj = () => {
    const startDate = new Date(date);
    const endDate = new Date(now);

    let years = endDate.getFullYear() - startDate.getFullYear();
    let months = endDate.getMonth() - startDate.getMonth();
    let days = endDate.getDate() - startDate.getDate();
    let hours = endDate.getHours() - startDate.getHours();
    let minutes = endDate.getMinutes() - startDate.getMinutes();
    let seconds = endDate.getSeconds() - startDate.getSeconds();

    if (seconds < 0) {
      minutes--;
      seconds += 60;
    }
    if (minutes < 0) {
      hours--;
      minutes += 60;
    }
    if (hours < 0) {
      days--;
      hours += 24;
    }
    if (days < 0) {
      months--;
      const lastDayOfMonth = new Date(
        endDate.getFullYear(),
        endDate.getMonth(),
        0
      ).getDate();
      days += lastDayOfMonth;
    }
    if (months < 0) {
      years--;
      months += 12;
    }
    let timeString = '';

    if (years > 0) {
      timeString += `${years} anos, `;
    }
    if (months > 0) {
      timeString += `${months % 12} meses, `;
    }
    if (days > 0) {
      timeString += `${days % 365} dias, `;
    }
    if (hours > 0) {
      timeString += `${hours % 24} horas, `;
    }
    if (minutes > 0) {
      timeString += `${minutes % 60} minutos e `;
    }
    timeString += `${seconds % 60} segundos`;

    return timeString;
  };

  // const { seconds, minutes, hours, days, weeks, months, years } =
  //   getTime(diference);

  // const time = (semanas: number): string => {
  //   const months = Math.floor(semanas / 4);
  //   const fMonths = Math.floor(months % 12);
  //   const anos = Math.floor(months / 12);
  //   return `${anos} anos ${fMonths} meses`;
  // };

  // if (1 + 1 === 2) return <Loading />;

  const loadBooks = async () => {
    try {
      const res = await axios.get<BookProps[]>(
        `${import.meta.env.VITE_SERVER_URL}/get-books`
      );
      setBooks(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const loadImages = async () => {
    try {
      const res = await axios.get<ImageType[]>(
        `${import.meta.env.VITE_SERVER_URL}/get-images`
      );
      setImages(res.data);
    } catch (e) {
      console.error('Error fetching images:', e);
    }
  };

  const saveVerse = async (chapter: number, number: number) => {
    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_SERVER_URL}/save-verse`, {
        version: sVersion === 'ara' ? 'ra' : sVersion,
        abbrev: sAbbrev,
        chapter,
        number
      });
    } catch (e) {
      console.error('Error saving verse:', e);
    } finally {
      setLoading(false);
      setOpenForm({ state: false, type: 'biblia' });
      setSearchedVerses(undefined);
      getVerses();
    }
  };

  const getVerses = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/get-verses`
      );
      setVerses(res.data);
    } catch (e) {
      console.error('Error fetching verses:', e);
    }
  };

  const searchVerses = async (chapter: number) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_SERVER_URL
        }/search-verses/${sVersion}/${sAbbrev}/${chapter}`
      );
      setSearchedVerses(res.data);
    } catch (e) {
      console.error('Error searching verses:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : null;
    setImageFile(files);
  };

  useEffect(() => {
    if (imageFile) {
      handleAddImage();
    }
  }, [imageFile]); //eslint-disable-line

  const compressImage = async (file: File) => {
    const options = {
      maxSizeMB: 0.5,
      useWebWorker: true
    };
    const compressedFile = await imageCompression(file, options);
    return compressedFile;
  };

  const handleAddImage = async () => {
    setLoading(true);
    try {
      if (!imageFile) {
        return;
      }

      if (!imageFile || imageFile.length === 0) {
        return;
      }
      for (let i = 0; i < imageFile.length; i++) {
        const file = imageFile[i];
        if (file) {
          await uploadImage(
            URL.createObjectURL(await compressImage(file)),
            '',
            'upload-image'
          );
          loadImages();
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className='container'
      style={{ userSelect: seeBackground ? 'none' : 'inherit' }}
    >
      {firstLoading && (
        <div className='first-loading'>
          <PuffLoader color='purple' />
        </div>
      )}

      {loading && (
        <div className='loading'>
          <PuffLoader color='purple' />
        </div>
      )}
      <div
        onMouseDown={() => {
          setSeeBackground(true);
        }}
        onMouseUp={() => {
          setSeeBackground(false);
        }}
        onTouchStart={() => {
          setSeeBackground(true);
        }}
        onTouchEnd={() => {
          setSeeBackground(false);
        }}
        className={`parent ${seeBackground ? 'seeBackground' : ''}`}
      >
        {images && images.length > 0 && (
          <>
            <div className='div1'>
              {' '}
              <img src={images[img0].url} alt='' />
            </div>
            <div className='div2'>
              {' '}
              <img src={images[img1].url} alt='' />
            </div>
            <div className='div3'>
              {' '}
              <img src={images[img2].url} alt='' />
            </div>
            <div className='div4'>
              {' '}
              <img src={images[img3].url} alt='' />
            </div>
            <div className='div5'>
              {' '}
              <img src={images[img4].url} alt='' />
            </div>
            <div className='div6'>
              {' '}
              <img src={images[img5].url} alt='' />
            </div>
            <div className='div7'>
              {' '}
              <img src={images[img6].url} alt='' />
            </div>
            <div className='div8'>
              {' '}
              <img src={images[img7].url} alt='' />
            </div>
            <div className='div9'>
              {' '}
              <img src={images[img8].url} alt='' />
            </div>
            <div className='div10'>
              {' '}
              <img src={images[img9].url} alt='' />
            </div>
            <div className='div11'>
              {' '}
              <img src={images[img10].url} alt='' />
            </div>
            <div className='div12'>
              {' '}
              <img src={images[img11].url} alt='' />
            </div>
            <div className='div13'>
              {' '}
              <img src={images[img12].url} alt='' />
            </div>
            <div className='div14'>
              {' '}
              <img src={images[img13].url} alt='' />
            </div>
            <div className='div15'>
              {' '}
              <img src={images[img14].url} alt='' />
            </div>
            <div className='div16'>
              {' '}
              <img src={images[img15].url} alt='' />
            </div>
            <div className='div17'>
              {' '}
              <img src={images[img16].url} alt='' />
            </div>
            <div className='div18'>
              {' '}
              <img src={images[img17].url} alt='' />
            </div>
            <div className='div19'>
              {' '}
              <img src={images[img18].url} alt='' />
            </div>
            <div className='div20'>
              {' '}
              <img src={images[img19].url} alt='' />
            </div>
          </>
        )}
      </div>
      <div></div>
      <section className='images-container'>
        <button type='button' className='add-image-button'>
          <input
            type='file'
            accept='image/*'
            name='image'
            id=''
            onChange={(e) => {
              const files = e.target.files;
              if (files && files.length > 5) {
                alert('Apenas 5 imagens podem ser enviadas de uma vez');
                e.target.value = '';
                return;
              }
              handleFileChange(e);
            }}
          />
          <FaPlusCircle color='purple' size={20} />
        </button>
        <div className='first-content'>
          <div className='main-images'>
            <div className='main-images-content'>
              {images &&
                images.map((image, index) => (
                  <img key={index} src={image.url} alt={`imagem ${index}`} />
                ))}
            </div>
          </div>
        </div>
        <div className='second-images-container'>
          <div className='second-images-line'>
            <div className='second-images-line-content'>
              {images &&
                images.map((image, index) => (
                  <img key={index} src={image.url} alt={`imagem ${index}`} />
                ))}
            </div>
          </div>
        </div>
      </section>

      {searchedVerses && searchedVerses.verses.length > 0 && (
        <div className='verse-modal'>
          <div className='verse-modal-content'>
            <h3>
              {searchedVerses.book.name} {searchedVerses.chapter.number}
            </h3>
            {searchedVerses.verses.map((sverse, index) => (
              <span
                onMouseOver={() => setVerse(sverse)}
                onClick={() => {
                  setVerse(sverse);
                  console.log(verse);
                  navigator.clipboard.writeText(
                    `${searchedVerses.book.name} ${searchedVerses.chapter.number}:${sverse.number} \n${sverse.text}`
                  );
                }}
                onDoubleClick={() => {
                  saveVerse(searchedVerses.chapter.number, sverse.number);
                }}
                key={index}
              >
                <sup>{sverse.number} </sup>
                {sverse.text}{' '}
              </span>
            ))}
          </div>
        </div>
      )}
      <section className='notes-main-container'>
        <div className='sub-caption'>{typedText}</div>

        <div className='notes-container'>
          <div className='notes'>
            <div className='content'>
              {currentBtn === 'notas' && (
                <>
                  <div className='text'>Notas</div>
                  {openForm.state && openForm.type === 'notas' && (
                    <div className='text'>
                      <textarea className='textarea' />
                    </div>
                  )}
                </>
              )}
              {currentBtn === 'biblia' && (
                <>
                  {openForm.state && openForm.type === 'biblia' && (
                    <div className='text chapters'>
                      {books.map((book, index) => (
                        <div
                          id={book.abbrev.pt}
                          onClick={() => {
                            setBookOpen({ ...book, index });
                            setSAbbrev(book.abbrev.pt);
                          }}
                          onMouseOver={() => setSAbbrev(book.abbrev.pt)}
                          className='details'
                          key={index}
                        >
                          <summary>
                            {book.name}{' '}
                            <div
                              className='versions'
                              style={{
                                transform:
                                  bookOpen?.name === book.name
                                    ? 'scaleX(1)'
                                    : 'scaleX(0)'
                              }}
                            >
                              {versions.map((version, index) => (
                                <span
                                  className={`${
                                    version.version === sVersion
                                      ? 'selected-version'
                                      : ''
                                  }`}
                                  onClick={() => setSVersion(version.version)}
                                  key={index}
                                >
                                  {version.pt_version}
                                </span>
                              ))}
                            </div>{' '}
                          </summary>

                          <ul
                            className='chapters'
                            style={{
                              transition: '.5s',
                              animation:
                                bookOpen && bookOpen.index === index
                                  ? 'openBook 0.5s forwards'
                                  : 'closeBook 0.5s forwards'
                            }}
                          >
                            {Array.from({ length: book.chapters }, (_, i) => (
                              <li key={i} onClick={() => searchVerses(i + 1)}>
                                {i + 1}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                  {verses &&
                    verses.length > 0 &&
                    verses.map((verse, index) => (
                      <div
                        style={{
                          display: openForm.state ? 'none' : 'block'
                        }}
                        className='text'
                        key={index}
                      >
                        <span className='verse-info'>
                          <strong>
                            {verse.name} {verse.chapter}:{verse.number} -{' '}
                            {getPtVersion(verse.version)
                              .toString()
                              .toUpperCase()}
                          </strong>
                        </span>
                        <br />
                        {verse.text}
                      </div>
                    ))}
                </>
              )}
              {currentBtn === 'filmes' && (
                <>
                  <div className='text'>Filmes</div>
                  {openForm.state && openForm.type === 'filmes' && (
                    <div className='text filme'>
                      <textarea className='textarea' />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
          <div className='actions'>
            <button
              style={{
                scale: currentBtn === 'notas' ? 1.2 : '',
                boxShadow: currentBtn === 'notas' ? 'var(--shadow)' : '',
                border: currentBtn === 'notas' ? 'var(--border)' : ''
              }}
              onClick={() => setCurrentBtn('notas')}
              onDoubleClick={() => setOpenForm({ state: true, type: 'notas' })}
            >
              <FaNoteSticky />
            </button>
            <button
              style={{
                scale: currentBtn === 'biblia' ? 1.2 : '',
                boxShadow: currentBtn === 'biblia' ? 'var(--shadow)' : '',
                border: currentBtn === 'biblia' ? 'var(--border)' : ''
              }}
              onClick={() => {
                setCurrentBtn('biblia');
                setOpenForm({ state: false, type: 'biblia' });
                setSearchedVerses(undefined);
              }}
              onDoubleClick={() => {
                setOpenForm({ state: true, type: 'biblia' });
              }}
            >
              <FaBible />
            </button>
            <button
              style={{
                scale: currentBtn === 'filmes' ? 1.2 : '',
                boxShadow: currentBtn === 'filmes' ? 'var(--shadow)' : '',
                border: currentBtn === 'filmes' ? 'var(--border)' : ''
              }}
              onClick={() => setCurrentBtn('filmes')}
              onDoubleClick={() => setOpenForm({ state: true, type: 'filmes' })}
            >
              <FaFilm />
            </button>
          </div>
        </div>
      </section>
      <div className='days-container'>
        <span>{timeObj()}</span>
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

      {/* <button
        onClick={() => {
          setSeeBackground(true);
          setTimeout(() => {
            setSeeBackground(false);
          }, 3000);
        }}
      >
        Ver Background
      </button> */}
    </div>
  );
}

export default App;
