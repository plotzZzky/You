'use client'
import { useRouter } from 'next/navigation';
import { useAuth } from '@comps/authContext';


export default function HomePage() {
  const [Token, setToken] = useAuth();
  const router = useRouter();

  const FAQ = [
    {
      "question": "O que é a You?",
      "answer": "You é uma plataforma de rede social focada em compartilhar momentos significativos e relevantes da vida dos usuários. É um espaço para postar e valorizar o que realmente importa em suas vidas."
    },
    {
      "question": "Como faço para começar a usar o You?",
      "answer": "Para começar, basta criar uma conta gratuita no You. Depois de fazer login, você poderá começar a compartilhar os momentos importantes da sua vida através de postagens."
    },
    {
      "question": "Existe um limite para o número de postagens que posso fazer no You?",
      "answer": "Não há um limite específico para o número de postagens que você pode fazer no You. A plataforma incentiva a expressão livre e o compartilhamento dos momentos que são importantes para você."
    },
    {
      "question": "O You possui alguma versão premium ou planos pagos?",
      "answer": "Atualmente, o You oferece uma experiência completa gratuitamente para todos os usuários. No entanto, podem ser disponibilizados recursos premium no futuro, mas a maior parte da plataforma é e continuará sendo gratuita para todos."
    },
    {
      "question": "Como posso relatar problemas ou sugerir melhorias para o You?",
      "answer": "Se você encontrar problemas técnicos ou desejar sugerir melhorias para o You, entre em contato conosco através da seção de Suporte no site ou por meio dos canais de contato disponíveis na plataforma. Estamos sempre abertos a ouvir e melhorar."
    },
  ];

  const faqItems = () => {
    // Cria os items do faq
    return FAQ.map((data, index) => (
      <details key={index}>
        <summary> {data.question} </summary>
        <p className='details-text'> {data.answer} </p>
      </details>
    ))
  }

  function goToLogin() {
    if (Token !== null && typeof Token === 'string') {
      router.push("/login/");
    } else {
      router.push("/app/");
    }
  }

  return (
    <>
      <div className='page-home' id='Start'>
        <div className='align-home-page'>
          <div className='div-align-text-home'>
            <div>
              <h1 className='big-title'> Bem-vindo à You! </h1>
              <h2> A You é a plataforma para compartilhar o que importa na sua vida com amigos, familiares e o mundo... </h2>
              <button onClick={goToLogin}> Fazer parte!</button>
            </div>
          </div>
          <img className='img-background' src={'background_a.jpg'} loading='lazy'></img>
        </div>   
      </div>

      <div className='page-home' id='About'>
        <div className='align-home-page-midle'>
          <img className='img-background' src={'background_c.jpg'} loading='lazy'></img>
          <div className='div-align-text-home'>
            <h1> Sobre... </h1>
            <p> A You é uma plataforma para compartilhamento de fotos, é ideal para quem quer compartilhar suas experiências com o mundo. Aqui você pode criar uma galeria pessoal, seguir amigos e descobrir novas tendências e temas que são importantes para você. Com a You, você nunca perde um momento importante e pode reviver suas lembranças sempre que quiser.</p>
            <p>Junte-se à comunidade You hoje mesmo!</p>
          </div>
        </div>      
      </div>

      <div className='page-home' id='Faq'>
        <h1> Duvias frequentes: </h1>
        {faqItems()}
      </div>
    </>
  )
}