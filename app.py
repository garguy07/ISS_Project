from flask import Flask, request, jsonify, render_template, flash, redirect, url_for
import sqlite3
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.secret_key = 'secret key'

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


# @app.route('/get_songs', methods=['POST'])
@app.route('/p.html', methods=['GET', 'POST'])
def get_songs():
    if request.method == 'POST':
        id = request.form.get('id')
        if id:
            conn = sqlite3.connect('playlist.db')
            c = conn.cursor()
            c.execute('DELETE FROM playlist WHERE id = ?', (id,)) 
            conn.commit()
            conn.close()
            flash('Song deleted successfully')
            # return redirect(url_for('p.html'))
            return render_template('p.html')
    
    
    conn = sqlite3.connect('playlist.db')
    c = conn.cursor()
    c.execute('SELECT * FROM playlist')
    rows = c.fetchall()
    conn.close()
    return render_template('p.html', rows=rows)


if __name__ == '__main__':
    app.run(debug=True, port=5001)
