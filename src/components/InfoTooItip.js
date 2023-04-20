function InfoTooItip({ isOpen, onClose, image, title }) {
    return (
        <div className={`popup popup-info ${isOpen ? 'popup_opened' : ''}`} onClick={onClose}>
            <div className="popup-info__container">
                <button aria-label="Закрыть" type="button" className="popup__close" onClick={onClose}></button>
                <img className="popup-info__image" src={image} alt={title} />
                <h2 className="popup-info__title">{title}</h2>
            </div>
        </div>
    )
}

export default InfoTooItip;
