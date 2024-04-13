import React from 'react'
import Link from 'next/link'

function Task() {
  return (
    <><div className="card w-96 bg-primary text-primary-content m-2">
    <div className="card-body">
      <h2 className="card-title">Card title!</h2>
      <p>If a dog chews shoes whose shoes does he choose?</p>
      <div className="card-actions justify-between">
      <button className="btn btn-sm btn-outline bg-warning">Редактировать</button>
        <button className="btn btn-sm btn-outline bg-warning">Удалить</button>
      </div>
      <div className='flex flex-row justify-between'>
      <Link href={''} className='hover:font-extrabold'>Важно, не срочно</Link>
    <Link href={''} className='hover:font-extrabold'>Не важно, срочно</Link>
     <Link href={''} className='hover:font-extrabold'>Не важно, не срочно</Link>

      </div>
    </div>
  </div></>
  )
}

export default Task