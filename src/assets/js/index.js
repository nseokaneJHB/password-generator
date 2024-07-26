// Initialize variables
const passwordValue = document.getElementById("password-value");
const copyButton = document.getElementById("copy");

const lengthTrack = document.getElementById("length-input-right-track");
const lengthValue = document.getElementById("length-value");
const lengthInput = document.getElementById("length-input");

const uppercasesCheckbox = document.getElementById("uppercases");
const lowercasesCheckbox = document.getElementById("lowercases");
const numbersCheckbox = document.getElementById("numbers");
const symbolsCheckbox = document.getElementById("symbols");

const strengthValue = document.getElementById("strength-value");
const strengthRectangles = document.getElementsByClassName(
	"wrapper-password-strength-rectangle"
);

const generatePasswordButton = document.getElementById(
	"generate-password-button"
);

const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "/[!@#$%^&*()_+{}[]:;<>,.?/~\\-]/";

const generatePassword = () => {
	let characters;

	if (uppercasesCheckbox.checked) {
		characters += uppercaseLetters;
	}

	if (lowercasesCheckbox.checked) {
		characters += lowercaseLetters;
	}

	if (numbersCheckbox.checked) {
		characters += numbers;
	}

	if (symbolsCheckbox.checked) {
		characters += symbols;
	}

	let password;
	for (let i = 0; i < lengthInput.value; i++) {
		if (!characters || characters.length < 1) {
			alert(
				"Please specify what to include on your password by checking at least one checkbox."
			);
			return;
		}

		const generatedCharacter = characters.charAt(
			Math.floor(Math.random() * characters.length)
		);

		if (!password) {
			password = generatedCharacter;
		} else {
			password += generatedCharacter;
		}
	}

	return password;
};

const passwordStrengthCheck = (password) => {
	let strength = 0;

	if (/[a-z]/.test(password) && /[A-Z]/.test(password)) {
		strength++;
	}

	if (/[0-9]/.test(password)) {
		strength++;
	}

	if (/[!@#$%^&*()_+{}\[\]:;<>,.?/~\\-]/.test(password)) {
		strength++;
	}

	if (password.length >= 8) {
		strength++;
	}

	if (strength <= 1) {
		return "to weak";
	} else if (strength === 2) {
		return "weak";
	} else if (strength === 3) {
		return "medium";
	} else {
		return "strong";
	}
};

const updatePasswordStrength = () => {
	const password = generatePassword();
	const passwordStrength = passwordStrengthCheck(password);

	const strengthClasses = {
		"to weak": ["to-weak"],
		weak: ["weak", "weak"],
		medium: ["medium", "medium", "medium"],
		strong: ["strong", "strong", "strong", "strong"],
	};

	const strengthRectanglesArray = Array.from(strengthRectangles);

	// Clear existing strength classes
	strengthRectanglesArray.forEach((rect) => {
		rect.classList.remove("to-weak", "weak", "medium", "strong");
	});

	// Add new strength classes based on the password strength
	if (strengthClasses[passwordStrength]) {
		strengthClasses[passwordStrength].forEach((cls, index) => {
			if (strengthRectanglesArray[index]) {
				strengthRectanglesArray[index].classList.add(cls);
			}
		});
	}

	return passwordStrength;
};

const setLengthTrackWidth = (length) => {
	lengthTrack.style.width = `${
		((length - lengthInput.min) / (lengthInput.max - lengthInput.min)) * 100
	}%`;
};

// Initialize values on load
window.onload = () => {
	setLengthTrackWidth(lengthInput.value);
	lengthValue.innerHTML = lengthInput.value;
	passwordValue.innerHTML = generatePassword();
	strengthValue.innerHTML = updatePasswordStrength();
};

// Add event listeners
lengthInput.addEventListener("input", (event) => {
	const length = event.target.value;
	lengthValue.innerHTML = length;
	setLengthTrackWidth(length);
});

generatePasswordButton.addEventListener("click", () => {
	const password = generatePassword();
	passwordValue.innerHTML = password;
	strengthValue.innerHTML = updatePasswordStrength();
});

copyButton.addEventListener("click", () => {
	navigator.clipboard.writeText(passwordValue.innerHTML);

	alert("Password copied to clipboard.");
	return;
});
