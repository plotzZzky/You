'use client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"

export default function Footer() {

  function goToGitHub() { router.push("https://github.com/plotzzzky") }

  return (
    <footer>
      <div className='brand'>
        <span className='you-brand'> You! </span>
      </div>

      <div className='contacts'>
        <h3> Contatos: </h3>

        <p>
          <FontAwesomeIcon icon={faEnvelope}/>
          <a> contato@you.com </a>
        </p>

        <p>
          <FontAwesomeIcon icon={faEnvelope}/>
          <a> equipe@you.com </a>
        </p>
      </div>

      <div className='contacts'>
        <h3> Dev: </h3>

        <p>
          <FontAwesomeIcon icon={faEnvelope}/>
          <a> dev@you.com </a>
        </p>

        <p onClick={goToGitHub}>
          <FontAwesomeIcon icon={faGithub} />
          <a> github.com/you </a>
        </p>
      </div>
    </footer>
  )
}