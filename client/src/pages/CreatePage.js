import {useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {useHistory} from "react-router-dom";

export const CreatePage = () => {
  const history = useHistory()
  const auth = useContext(AuthContext)
  const {request} = useHttp()
  const [link, setLink] = useState('')
  const changeHandler = (e) => {
    setLink(e.target.value)
  }
  const pressHandler = async (e) => {
    if (e.key === 'Enter') {
      try {
        const data = await request('/api/link/generate', 'POST', {from: link}, {
          Authorization: `Bearer ${auth.token}`
        })

        history.push(`/detail/${data.link._id}`)

      } catch (e) {
      }
    }
  }

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  return (
    <div className='row'>
      <div className="col s8 offset-2" style={{paddingTop: '2rem'}}>
        <div className="input-field">
          <input placeholder="Вставте ссылку"
                 id="link"
                 type="text"
                 value={link}
                 onChange={changeHandler}
                 onKeyPress={pressHandler}
          />
          <label htmlFor="link">Введите ссылку</label>
        </div>
      </div>
    </div>
  )
}