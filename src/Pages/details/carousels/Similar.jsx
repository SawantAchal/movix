import React from 'react'
import useFetch from '../../../Hooks/useFetch'
import Carousal from '../../../Components/corousel/Carousal'

const Similar = ({ mediaType, id }) => {
    const { data, loading, error } = useFetch(`/${mediaType}/${id}/similar`);
    const title = mediaType === "tv" ? "Similar TV Shows" : "Similar Movies";

  return (
    <Carousal title={title} data={data?.results} loading={loading} endpoint={mediaType} />
  )
}

export default Similar