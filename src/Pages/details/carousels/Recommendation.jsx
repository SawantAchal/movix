import React from 'react'
import useFetch from '../../../Hooks/useFetch';
import Carousal from '../../../Components/corousel/Carousal';

const Recommendation = ({ mediaType, id }) => {
    const { data, loading, error } = useFetch(
        `/${mediaType}/${id}/recommendations`
    );

  return (
    <Carousal title="Recommendations" data={data?.results} loading={loading} endpoint={mediaType}/>
  )
}

export default Recommendation