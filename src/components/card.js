import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro';

export const Card = ({icone, data, desc, temp_atual, sens_term, temp_min, temp_max, nuvens, umi, vel_vento}) => {

    return (
        <div className='Card'>
            <img className='card__img' src={icone} alt=''/>
            <div className='card__body'>
                <h2 className='card__date'>{data}</h2>
                <h3 className='card__description'>{desc}</h3>
                <p className='card__temp'><FontAwesomeIcon icon={regular('temperature-half')} /> {temp_atual}</p>
                <p className='card__ther_sens'><FontAwesomeIcon icon={regular("heat")} /> {sens_term}</p>
                <p className='card__temp_min'><FontAwesomeIcon icon={regular("temperature-low")} /> {temp_min}</p>
                <p className='card__temp_max'><FontAwesomeIcon icon={regular("temperature-high")} /> {temp_max}</p>
                <p className='card__clouds'><FontAwesomeIcon icon={regular("clouds")} /> {nuvens}</p>
                <p className='card__hum'><FontAwesomeIcon icon={regular("droplet-percent")} /> {umi}</p>
                <p className='card__wind'><FontAwesomeIcon icon={regular("wind")} /> {vel_vento}</p>
            </div>
        </div>
    )

}