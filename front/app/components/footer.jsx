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
        <p> Contatos: </p>

        <p>
          <FontAwesomeIcon icon={faEnvelope}/>
          <a> contato@you.com </a>
        </p>
      </div>

      <div className='contacts'>
        <p> Dev: </p>

        <p onClick={goToGitHub}>
          <FontAwesomeIcon icon={faGithub} />
          <a> GitHub.com/you </a>
        </p>
      </div>
    </footer>
  )
}