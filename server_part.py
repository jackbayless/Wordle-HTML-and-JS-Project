"""
THIS IS JUST A SNIPPET OF SERVER CODE THAT THE WORDLE USES
Imports not included
"""

@app.get("/wordle/getword")
def send_word():

	length = request.args.get("length")
	if length is None:
		return jsonify({"ok": False, "error": "missing length arg"}), 400

	length = int(length)
	word = get_word(length)

	return jsonify({"ok": True, "word": word}), 200

def get_word(length: int):

	file_path = os.path.expanduser(f"~/data/wordle/{length}_letter_words.json")

	with open(file_path, "r") as f:
		words = json.load(f)

	ind = random.randint(0, len(words) - 1)
	return words[ind]

@app.get("/wordle")
def send_wordle_homepage():
	return render_template("wordle/Wordle.html")