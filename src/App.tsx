import { useEffect, useState } from 'react';
import './App.css';
import { FaFilm, FaNoteSticky } from 'react-icons/fa6';
import { FaBible } from 'react-icons/fa';
import axios from 'axios';
// import Loading from './_components/Loading';

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

const images = [
  'https://firebasestorage.googleapis.com/v0/b/helo-realtor.appspot.com/o/ana%2FWhatsApp%20Image%202025-06-10%20at%2016.53.00_4c2ab54a.jpg?alt=media&token=6ab8796a-d368-4ad6-be0c-e3c2efeca117',
  'https://firebasestorage.googleapis.com/v0/b/helo-realtor.appspot.com/o/ana%2FWhatsApp%20Image%202025-06-10%20at%2016.53.03_06d71aa1.jpg?alt=media&token=88ebe8a2-576a-446e-9508-e05f888200fc',
  'https://firebasestorage.googleapis.com/v0/b/helo-realtor.appspot.com/o/ana%2FWhatsApp%20Image%202025-06-10%20at%2016.53.04_809b5d2f.jpg?alt=media&token=e17615c7-1881-4656-8440-f4280d8f44fc',
  'https://firebasestorage.googleapis.com/v0/b/helo-realtor.appspot.com/o/ana%2FWhatsApp%20Image%202025-06-10%20at%2016.53.07_ea2ddd61.jpg?alt=media&token=1bbd94ac-0967-4cfc-b54d-6eec435d6bb9',
  'https://firebasestorage.googleapis.com/v0/b/helo-realtor.appspot.com/o/ana%2FWhatsApp%20Image%202025-06-10%20at%2016.53.15_d27b2cab.jpg?alt=media&token=64ad03a2-a68e-49c3-8112-5a1da9fbade2',
  'https://firebasestorage.googleapis.com/v0/b/helo-realtor.appspot.com/o/ana%2FWhatsApp%20Image%202025-06-10%20at%2016.53.17_0cee4134.jpg?alt=media&token=1119eeac-9959-4b6e-954d-cbab75d28b29',
  'https://firebasestorage.googleapis.com/v0/b/helo-realtor.appspot.com/o/ana%2FWhatsApp%20Image%202025-06-10%20at%2016.54.27_658a0f60.jpg?alt=media&token=606d4d1e-f423-4d5a-a2e6-58f5fcfc1a94',
  'https://firebasestorage.googleapis.com/v0/b/helo-realtor.appspot.com/o/ana%2FWhatsApp%20Image%202025-06-10%20at%2016.54.28_026d3a5b.jpg?alt=media&token=8eda71ed-72c2-4951-9322-f8a75a3ea1dd',
  'https://firebasestorage.googleapis.com/v0/b/helo-realtor.appspot.com/o/ana%2FWhatsApp%20Image%202025-06-10%20at%2016.54.30_4f49b866.jpg?alt=media&token=5605c07a-0999-4a6c-9a38-e4fd4880b399',
  'https://firebasestorage.googleapis.com/v0/b/helo-realtor.appspot.com/o/ana%2FWhatsApp%20Image%202025-06-10%20at%2016.54.31_07223a7a.jpg?alt=media&token=47aee9b5-c2ea-43b7-979f-f688fe451c07',
  'https://firebasestorage.googleapis.com/v0/b/helo-realtor.appspot.com/o/ana%2FWhatsApp%20Image%202025-06-10%20at%2016.59.45_e4525695.jpg?alt=media&token=1c2d2f8f-e581-4de9-a2a4-2e9ef8a0667c',
  'https://firebasestorage.googleapis.com/v0/b/helo-realtor.appspot.com/o/ana%2FIMG-20250623-WA0031.jpg?alt=media&token=5e11fc92-34e2-4aa7-8ab8-3dce8be2b6df',
  'https://firebasestorage.googleapis.com/v0/b/helo-realtor.appspot.com/o/ana%2FIMG-20250623-WA0032.jpg?alt=media&token=ff687458-17d8-44ce-8071-3191c3f31eb3',
  'https://firebasestorage.googleapis.com/v0/b/helo-realtor.appspot.com/o/ana%2FIMG-20250623-WA0033.jpg?alt=media&token=6e852b8b-f09c-47c4-9792-2d0dcb32dd6f',
  'https://firebasestorage.googleapis.com/v0/b/helo-realtor.appspot.com/o/ana%2FIMG-20250623-WA0034.jpg?alt=media&token=cad18174-809c-4f80-8fc0-1d7cbd8b944c',
  'https://firebasestorage.googleapis.com/v0/b/helo-realtor.appspot.com/o/ana%2FIMG-20250623-WA0035.jpg?alt=media&token=4323b6ce-2c3c-4457-a369-c06c97f5238d',
  'https://firebasestorage.googleapis.com/v0/b/helo-realtor.appspot.com/o/ana%2FIMG-20250623-WA0036.jpg?alt=media&token=6d849078-3507-47a7-bd4b-a045bfd344a3',
  'https://firebasestorage.googleapis.com/v0/b/helo-realtor.appspot.com/o/ana%2FIMG-20250623-WA0037.jpg?alt=media&token=422e7292-abbf-4442-84a3-2fbfb08cdaea',
  'https://firebasestorage.googleapis.com/v0/b/helo-realtor.appspot.com/o/ana%2FIMG-20250623-WA0038.jpg?alt=media&token=d61cd664-cfdd-45ee-8f92-da32a52f8a3f',
  'https://firebasestorage.googleapis.com/v0/b/helo-realtor.appspot.com/o/ana%2FIMG-20250623-WA0039.jpg?alt=media&token=97791738-d29a-47e1-ad4e-b37b69172714',
  'https://firebasestorage.googleapis.com/v0/b/helo-realtor.appspot.com/o/ana%2FIMG-20250623-WA0040.jpg?alt=media&token=e6241810-a26b-4248-9fdb-d1bbb0a9580f',
  'https://firebasestorage.googleapis.com/v0/b/helo-realtor.appspot.com/o/ana%2FIMG-20250623-WA0041.jpg?alt=media&token=58bd17b2-7eed-4a4b-92ef-8ee1de5098a7',
  'https://firebasestorage.googleapis.com/v0/b/helo-realtor.appspot.com/o/ana%2FIMG-20250623-WA0042.jpg?alt=media&token=198b7c01-44c6-4319-8e27-9b41c1954db0',
  'https://firebasestorage.googleapis.com/v0/b/helo-realtor.appspot.com/o/ana%2FIMG-20250623-WA0043.jpg?alt=media&token=235a80fd-ce09-4d1b-9c17-0319cabe5021',
  'https://firebasestorage.googleapis.com/v0/b/helo-realtor.appspot.com/o/ana%2FIMG-20250623-WA0044.jpg?alt=media&token=d23a8414-0987-4d0a-acc8-1b7dbdbcd291',
  'https://firebasestorage.googleapis.com/v0/b/helo-realtor.appspot.com/o/ana%2FIMG-20250623-WA0045.jpg?alt=media&token=a694524b-4ccc-4307-8720-712802df5495',
  'https://firebasestorage.googleapis.com/v0/b/helo-realtor.appspot.com/o/ana%2FIMG-20250623-WA0046.jpg?alt=media&token=36465dd8-3147-4bf2-be52-d691448b1e60',
  'https://firebasestorage.googleapis.com/v0/b/helo-realtor.appspot.com/o/ana%2FIMG-20250623-WA0047.jpg?alt=media&token=a8e6a417-4ce2-4508-ab86-22db99ef8df0',
  'https://firebasestorage.googleapis.com/v0/b/helo-realtor.appspot.com/o/ana%2FIMG-20250623-WA0048.jpg?alt=media&token=ef0dfea4-be33-4efc-8262-475c6f966c5e',
  'https://firebasestorage.googleapis.com/v0/b/helo-realtor.appspot.com/o/ana%2FIMG-20250623-WA0049.jpg?alt=media&token=c4af41b2-27d5-405e-8bc3-1c210b050dad',
  'https://firebasestorage.googleapis.com/v0/b/helo-realtor.appspot.com/o/ana%2FIMG-20250623-WA0050.jpg?alt=media&token=4c8fb32a-aa41-4397-a71a-8dedddde3712',
  'https://firebasestorage.googleapis.com/v0/b/helo-realtor.appspot.com/o/ana%2FIMG-20250623-WA0051.jpg?alt=media&token=e66e2605-1b7a-4bb4-bcb4-f75b091f9410'
];

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

function App() {
  const [currentBtn, setCurrentBtn] = useState('biblia');
  const [now, setNow] = useState(Date.now());
  const [seeBackground, setSeeBackground] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [loading, setLoading] = useState(true);
  const [openForm, setOpenForm] = useState({ state: false, type: 'bible' });
  const [verses, setVerses] = useState<Verse[]>([]);
  const [books, setBooks] = useState<BookProps[]>([]);
  const [bookOpen, setBookOpen] = useState<BookOpenProps>();
  const [searchedVerses, setSearchedVerses] = useState<sVersesRequest>();
  const [sVersion, setSVersion] = useState('nvi');
  const [sAbbrev, setSAbbrev] = useState('');
  const [verse, setVerse] = useState<sVersesProps>();

  // const imagesA = [];

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

  const amigos = '1584139208';
  const namorados = '1749336008';

  const [theDay, setTheDay] = useState(amigos);

  useEffect(() => {
    setInterval(() => {
      setLoading(false);
    }, 500);
  });

  useEffect(() => {
    setInterval(() => {
      setNow(Date.now());
    }, 10);
  }, []);

  useEffect(() => {
    if (loading) return;
    setInterval(() => {
      setTypedText((prev) => {
        if (prev.length < text.length) {
          return text.slice(0, prev.length + 1);
        }
        return prev;
      });
    }, 100); // Adjust the speed of typing here (100ms per character)
  }, [loading]);

  useEffect(() => {
    loadBooks();
    getVerses();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // for(let i = 0; i <= images.length; i++){
      //   imagesA.push(Math.floor(Math.random() * images.length))
      // }
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
    }, 10000);

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
      timeString += `${hours % 24} horas e `;
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
      console.log('Books fetched:', res.data);
      setBooks(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const saveVerse = async (chapter: number, number: number) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/save-verse`,
        {
          version: sVersion === 'ara' ? 'ra' : sVersion,
          abbrev: sAbbrev,
          chapter,
          number
        }
      );
      console.log('Verse saved:', res.data);
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
      console.log('Verses fetched:', res.data);
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

  return (
    <div
      className='container'
      style={{ userSelect: seeBackground ? 'none' : 'inherit' }}
    >
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
        <div className='div1'>
          {' '}
          <img src={images[img0]} alt='' />
        </div>
        <div className='div2'>
          {' '}
          <img src={images[img1]} alt='' />
        </div>
        <div className='div3'>
          {' '}
          <img src={images[img2]} alt='' />
        </div>
        <div className='div4'>
          {' '}
          <img src={images[img3]} alt='' />
        </div>
        <div className='div5'>
          {' '}
          <img src={images[img4]} alt='' />
        </div>
        <div className='div6'>
          {' '}
          <img src={images[img5]} alt='' />
        </div>
        <div className='div7'>
          {' '}
          <img src={images[img6]} alt='' />
        </div>
        <div className='div8'>
          {' '}
          <img src={images[img7]} alt='' />
        </div>
        <div className='div9'>
          {' '}
          <img src={images[img8]} alt='' />
        </div>
        <div className='div10'>
          {' '}
          <img src={images[img9]} alt='' />
        </div>
        <div className='div11'>
          {' '}
          <img src={images[img10]} alt='' />
        </div>
        <div className='div12'>
          {' '}
          <img src={images[img11]} alt='' />
        </div>
        <div className='div13'>
          {' '}
          <img src={images[img12]} alt='' />
        </div>
        <div className='div14'>
          {' '}
          <img src={images[img13]} alt='' />
        </div>
        <div className='div15'>
          {' '}
          <img src={images[img14]} alt='' />
        </div>
        <div className='div16'>
          {' '}
          <img src={images[img15]} alt='' />
        </div>
        <div className='div17'>
          {' '}
          <img src={images[img16]} alt='' />
        </div>
        <div className='div18'>
          {' '}
          <img src={images[img17]} alt='' />
        </div>
        <div className='div19'>
          {' '}
          <img src={images[img18]} alt='' />
        </div>
        <div className='div20'>
          {' '}
          <img src={images[img19]} alt='' />
        </div>
      </div>
      <section className='images-container'>
        <div className='first-content'>
          <div className='main-images'>
            <div className='main-images-content'>
              {images.map((image, index) => (
                <picture key={index}>
                  <img src={image} alt='' />
                </picture>
              ))}
            </div>
          </div>
        </div>
        <div className='second-images-container'>
          <div className='second-images-line'>
            <div className='second-images-line-content'>
              {images.map((image, index) => (
                <picture key={index}>
                  <img src={image} alt='' />
                </picture>
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
                if (bookOpen?.abbrev.pt !== '') {
                  window.location.href = `#${bookOpen?.abbrev.pt}`;
                }
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
