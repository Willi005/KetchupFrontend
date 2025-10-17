import './FoodCard.css'

export function FoodCard({name, price, category, stock, imgUrl}) {

    const formattedCategory = category.charAt(0)
        .toUpperCase() + category.slice(1).toLowerCase();

    return (
        <>
            <div className={'card-container'}>
                <img className={'card-image'} src={imgUrl} alt="World Classic"/>
                <div className={'card-info'}>
                    <span className={'card-name'}>{name}</span>
                    <span className={'card-price'}>$ {price}</span>
                    <span className={'card-stock'}>{`${stock} ${formattedCategory}s available`}</span>
                </div>
            </div>
        </>
    )
}
