



  const consumirApi= async(id)=>{
    return await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((r) => r.json());
  }


  const consumirApiFachada= async(id)=>{
    return await consumirApi(id)
  }

  export default consumirApiFachada