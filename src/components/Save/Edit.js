import style from "./Save.module.css"

export const Edit = ({

}) => {
	return (
		<section className="save">
			<h1>Edit post</h1>

			<form className={style["save-form"]}>
				<div className={style["input-container"]}>
					<input className="input" type="text" name="title" id="title" placeholder="Title" />
					<input className="input" type="text" name="imageUrl" id="imageUrl" placeholder="Image" />

					<div className="buttons-container">
						<button className="icon-button"><i className="fa-solid fa-circle-check" /></button>
						<button className="icon-button"><i className="fa-solid fa-circle-xmark" /></button>
					</div>
				</div>

				<textarea className={style["textarea"]} name="description" id="description" placeholder="Description" cols={30} rows={5} defaultValue={""} />
			</form>
		</section>
	)
}