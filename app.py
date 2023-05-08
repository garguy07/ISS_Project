from flask import Flask, request, jsonify
import sqlite3
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/add_song', methods=['POST'])
def add_song():
    songname = request.json['songName']
    with sqlite3.connect('playlist.db') as con:
    
        c = con.cursor()
        c.execute('SELECT * FROM playlist WHERE song_name = ?', (songname,))
        existing_song = c.fetchone()
        if existing_song is None:
            c.execute('INSERT INTO playlist (song_name) VALUES (?)', (songname,))
            # c.execute(f"INSERT INTO playlist (song_name) VALUES ('{songname})')")
            con.commit()
        return 'Song added successfully'

if __name__ == '__main__':
    app.run(debug=True,port=5001)
