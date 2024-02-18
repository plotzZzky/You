'use client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"

export default function Footer() {

  function goToGitHub() { router.push("https://github.com/plotzzzky") }

  return(
    <footer id="footer">
      <span className="you-brand"> You! </span>

      <div className="align-footer">

        <div className="link" onClick={goToGitHub}>
          <FontAwesomeIcon icon={faEnvelope} />
          <a> contato@you.com</a>
        </div>

        <div className="link" onClick={goToGitHub}>
          <FontAwesomeIcon icon={faEnvelope} />
          <a> marketing@you.com</a>
        </div>

        <div className="link" onClick={goToGitHub}>
          <FontAwesomeIcon icon={faGithub} />
          <a> Dev </a>
       </div>

      </div>
    </footer>
  )
}