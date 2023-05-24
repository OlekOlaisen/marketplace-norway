

 function NewAd() {
	
	const marketButton = document.querySelector('#market');
	const jobsButton = document.querySelector('#jobs');
	const propertyButton = document.querySelector('#property');
	const mainForm = document.querySelector('#main__form');
	
	marketButton.addEventListener('click', () => {
		updateContent(getMarketForm());
	});
	
	jobsButton.addEventListener('click', () => {
		updateContent(getJobsForm());
	});
	
	propertyButton.addEventListener('click', () => {
		updateContent(getPropertyForm());
	});
	
	function updateContent(content) {
		mainForm.innerHTML = content;
	}
	
	function getMarketForm() {
		// Define your market form HTML here
		const marketForm = `
			<form action="../../../netlify/functions/submitForm" method="POST">
				<label for="name">Name:</label>
				<input type="text" id="name" name="name" required>

				<label for="description">Description:</label>
				<textarea id="description" name="description" required></textarea>

				<label for="category">Category:</label>
				<input type="text" id="category" name="category" required>

				<label for="city">City:</label>
				<input type="text" id="city" name="city" required>

				<label for="priceNumber">Price:</label>
				<input type="number" id="priceNumber" name="priceNumber" required>

				<label for="priceCurrency">Currency:</label>
				<select id="priceCurrency" name="priceCurrency" required>
					<option value="nok">NOK</option>
					<option value="usd">USD</option>
					<option value="eur">EUR</option>
				</select>

				<label for="location">Location:</label>
				<input type="text" id="location" name="location" required>

				<label for="image">Image:</label>
				<input type="file" id="image" name="image" accept="image/*" multiple>

				<label for="state">State:</label>
				<select id="state" name="state" required>
					<option value="Used: As New">Used: As New</option>
					<option value="Used: Good Condition">Used: Good Condition</option>
					<option value="Used: Ok Condition">Used: Ok Condition</option>
				</select>

				<label for="sold">Sold:</label>
				<input type="checkbox" id="sold" name="sold">

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
			
			<label for="location">Location:</label>
			<input type="text" id="location" name="location" required>

			<label for="date">Deadline:</label>
			<input type="date" id="date" name="date" required>
			
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

	 document.querySelector('form').addEventListener('submit', function (event) {
		 event.preventDefault();

		 const formData = new FormData(event.target);

		 fetch(event.target.action, {
			 method: 'POST',
			 body: JSON.stringify(Object.fromEntries(formData)),
			 headers: {
				 'Content-Type': 'application/json'
			 }
		 })
			 .then(response => response.json())
			 .then(data => {
				 console.log('Success:', data);
				 // handle success here
			 })
			 .catch((error) => {
				 console.error('Error:', error);
				 // handle error here
			 });
	 });

}



NewAd();