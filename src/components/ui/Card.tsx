import { getCSSVariable } from '../../utils/getVariableCss';
import './Card.css';

interface cardProps {
	svg?: React.ReactNode;
	imgSrc?: string;
	title: string;
	titleColor?: string;
	description: string;
}

export default function Card({svg, imgSrc , title, titleColor, description}:cardProps ){

   const colorT = getCSSVariable(titleColor as string) || getCSSVariable('--gold-light') || null
return(
    <div className='card-container'>
        
    {//if card have img or svg
    svg &&(
        svg
    )}
    { 
    imgSrc &&( 
    <img className='card-img' src= {imgSrc} alt={`Describe or represent ${title}`} />
    )}

    <span className='card-title' style={{color: colorT || "" }} >{title}</span>
    <p className="card-description">{description}</p>
    
    </div>
)

}
