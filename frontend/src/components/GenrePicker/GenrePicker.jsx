const GenrePicker = ({ onGenreSelect }) => {
  const genres = [
    { id: 132, name: 'Pop', background: 'bg-pop' },
    { id: 116, name: 'Rap/Hiphop', background: 'bg-hiphop' },
    { id: 165, name: 'RnB', background: 'bg-RnB' },
    { id: 113, name: 'Dance', background: 'bg-dance' },
    { id: 173, name: 'Films/Games', background: 'bg-film' },
    { id: 464, name: 'Metal', background: 'bg-metal' }
  ]



  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="">
        <h1 className="text-4xl font-bold mb-8 text-center text-title-color">
          Select a genre
        </h1>
      </div>
      <div className="grid md:grid-cols-3 md:gap-12 p-8 xs:grid-cols-2 xs:gap-5">
        {genres.map(genre => (
          <button key={genre.id} className={`bg-box-color hover:bg-yellow hover:text-dark-purple text-text-color font-bold w-40 h-40 
            rounded-lg shadow-md flex items-center justify-center transition duration-300 =
            ease-in-out transform hover:scale-110`}
            onClick={() => onGenreSelect(genre.id, genre.background)}
          >
            <span className="text-xl">{genre.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default GenrePicker