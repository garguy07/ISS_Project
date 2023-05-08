from flask import Flask, request, render_template
import sqlite3

app = Flask(__name__)

@app.route('/index')

def index():
    return render_template('temp.html')

@app.route('/addsong', methods=['POST'])

def addsong():
    # Get the song data from the AJAX request
    title = request.json['title']
    artist = request.json['artist']
    album = request.json['album']

    # Insert the data into the database
    conn = sqlite3.connect('mydatabase.db')
    c = conn.cursor()
    c.execute('INSERT INTO songs (title, artist, album) VALUES (?, ?, ?)',
              (title, artist, album))
    conn.commit()
    conn.close()

    return 'Song added to database!'

if __name__ == '__main__':
    app.run(debug=True)