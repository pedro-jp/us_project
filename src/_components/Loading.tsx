import { useEffect, useRef, useState } from 'react';
import './loading.css';
import { IoMdHeart } from 'react-icons/io';

const Loading = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [afirmative, setAfirmative] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const temMouse = window.matchMedia('(pointer: fine)').matches;
  // const suportaHover = window.matchMedia('(hover: hover)').matches;
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        });
      }
    };

    // Atualiza as dimensões inicialmente
    updateDimensions();

    // Adiciona um listener para mudanças no tamanho da janela
    window.addEventListener('resize', updateDimensions);

    // Remove o listener ao desmontar o componente
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  const min = 10;
  const max = 100;

  const randomSize = () => {
    return Math.floor(Math.random() * (max - min)) + min; // Gera valores entre min e max
  };

  const randomMs = () => {
    return Math.floor(Math.random() * (1000 - 0)) + 0; // Gera valores entre min e max
  };

  const randomRotation = () => {
    return Math.floor(Math.random() * (10 - -10)) - 10;
  };

  const randomS = () => {
    return Math.floor(Math.random() * (2000 - 100) + 1000); // Gera valores entre min e max
  };

  const randomTop = () => {
    return Math.floor(Math.random() * dimensions.height); // Gera uma posição aleatória no eixo Y
  };

  const randomLeft = () => {
    return Math.floor(Math.random() * dimensions.width); // Gera uma posição aleatória no eixo X
  };
  const array = Array.from({ length: 100 }, (_, index) => index + 1); // [1, 2, ..., 10]

  const handleNegative = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (buttonRef.current) {
      buttonRef.current.style.transition = 'all 0.3s ease-in-out';
      buttonRef.current.style.position = 'absolute';
      buttonRef.current.style.left = `${randomLeft()}px`;
      buttonRef.current.style.top = `${randomTop()}px`;
    }
  };

  if (!temMouse) {
    return <h1>Use um computador ou dispositivo com mouse</h1>;
  }

  return (
    <div className='container' ref={containerRef}>
      {array.map((key) => {
        return (
          <IoMdHeart
            key={key}
            style={{
              position: 'absolute',
              top: randomTop(),
              left: randomLeft(),
              width: randomSize(),
              height: randomSize(),
              transform: `rotate(${randomRotation()}deg)`,
              animation: `pulse ${randomS()}ms ${randomMs()}ms  infinite`,
              color: 'red'
            }}
          />
        );
      })}
      {afirmative && <h1>Afirmativo</h1>}

      {!afirmative && (
        <div className='form'>
          <button
            className='afirmative'
            onClick={(e) => {
              e.preventDefault();
              setAfirmative(true);
            }}
          >
            aaaaaaaaaaaaaaa
          </button>
          <button
            className='negative'
            ref={buttonRef}
            onMouseEnter={(e) => handleNegative(e)}
          >
            nnnnnnnnnnnnnnn
          </button>
        </div>
      )}
    </div>
  );
};

export default Loading;
