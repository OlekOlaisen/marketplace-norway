export default function NewAd() {
	
	const button1 = document.getElementById('market');
	const button2 = document.getElementById('jobs');
	const button3 = document.getElementById('property');
	const display = document.getElementById('main__form');
	
	button1.addEventListener('click', () => {
		updateContent(getMarketForm());
	});
	
	button2.addEventListener('click', () => {
		updateContent(getJobsForm());
	});
	
	button3.addEventListener('click', () => {
		updateContent(getPropertyForm());
	});
	
	function updateContent(content) {
		display.innerHTML = content;
	}
	
	function getMarketForm() {
		// Define your market form HTML here
		const marketForm = `
			<form>
			<label for="title">Title:</label>
			<input type="text" id="title" name="title" required>
			
			<label for="description">Description:</label>
			<textarea id="description" name="description" required></textarea>
			
			<label for="price">Price:</label>
			<input type="number" id="price" name="price" required>
			
			<label for="location">Location:</label>
			<input type="text" id="location" name="location" required>
			
			<label for="image">Image:</label>
			<input type="file" id="image" name="image" accept="image/*">
			
			<button type="submit">Submit</button>
			</form>
		`;
		return marketForm;
	}
	
	function getJobsForm() {
		// Define your jobs form HTML here
		const jobsForm = `
			<form>
			<label for="title">Title:</label>
			<input type="text" id="title" name="title" required>
			
			<label for="description">Description:</label>
			<textarea id="description" name="description" required></textarea>
			
			<label for="price">Price:</label>
			<input type="number" id="price" name="price" required>
			
			<label for="location">Location:</label>
			<input type="text" id="location" name="location" required>
			
			<label for="image">Image:</label>
			<input type="file" id="image" name="image" accept="image/*">
			
			<button type="submit">Submit</button>
			</form>
		`;
		return jobsForm;
	}
	
	function getPropertyForm() {
		// Define your property form HTML here
		const propertyForm = `
			<form>
			<label for="title">Title:</label>
			<input type="text" id="title" name="title" required>
			
			<label for="description">Description:</label>
			<textarea id="description" name="description" required></textarea>
			
			<label for="price">Price:</label>
			<input type="number" id="price" name="price" required>
			
			<label for="location">Location:</label>
			<input type="text" id="location" name="location" required>
			
			<label for="image">Image:</label>
			<input type="file" id="image" name="image" accept="image/*">
			
			<button type="submit">Submit</button>
			</form>
		`;
		return propertyForm;
	}
}

