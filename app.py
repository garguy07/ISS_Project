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
            #return redirect(url_for('p.html'))
            conn = sqlite3.connect('playlist.db')
            c = conn.cursor()
            c.execute('SELECT * FROM playlist')
            rows = c.fetchall()
            conn.close()
            return render_template('p.html', rows=rows)


    conn = sqlite3.connect('playlist.db')
    c = conn.cursor()
    c.execute('SELECT * FROM playlist')
    rows = c.fetchall()
    conn.close()
    return render_template('p.html', rows=rows)

@app.route('/home.html')
def home():
    return render_template('home.html')

@app.route('/artists_page.html')
def art():
    return render_template('artists_page.html')

@app.route('/about.html')
def about():
    return render_template('about.html')


@app.route('/spotlight.html')
def spotlight():
    return render_template('spotlight.html')


@app.route('/search.html')
def search():
    return render_template('search.html')


@app.route('/+.html')
def a():
    return render_template('+.html')

@app.route('/=.html')
def b():
    return render_template('=.html')

@app.route('/6.html')
def c():
    return render_template('6.html')

@app.route('/1989.html')
def d():
    return render_template('1989.html')

@app.route('/charlie.html')
def charlie():
    return render_template('charlie.html')

@app.route('/CharlieAlbums.html')
def CA():
    return render_template('CharlieAlbums.html')

@app.route('/different.html')
def different():
    return render_template('different.html')

@app.route('/divide.html')
def di():
    return render_template('divide.html')

@app.route('/ego.html')
def eg():
    return render_template('ego.html')

@app.route('/evermore.html')
def eve():
    return render_template('evermore.html')

@app.route('/faded.html')
def faded():
    return render_template('faded.html')

@app.route('/fearless.html')
def fearless():
    return render_template('fearless.html')

@app.route('/folklore.html')
def folklore():
    return render_template('folklore.html')

@app.route('/handwritten.html')
def arte():
    return render_template('handwritten.html')

@app.route('/illuminate.html')
def artf():
    return render_template('illuminate.html')

@app.route('/loose.html')
def loose():
    return render_template('loose.html')

@app.route('/lover.html')
def lover():
    return render_template('lover.html')

@app.route('/mendes.html')
def mendes():
    return render_template('mendes.html')

@app.route('/midnight.html')
def mid():
    return render_template('midnight.html')

@app.route('/mtv.html')
def mtv():
    return render_template('mtv.html')

@app.route('/nine.html')
def nine():
    return render_template('nine.html')

@app.route('/nined.html')
def nined():
    return render_template('nined.html')

@app.route('/no5.html')
def no5():
    return render_template('no5.html')

@app.route('/racing.html')
def racing():
    return render_template('racing.html')

@app.route('/red.html')
def red():
    return render_template('red.html')

@app.route('/reputation.html')
def reputation():
    return render_template('reputation.html')


@app.route('/shawn.html')
def shawn():
    return render_template('shawn.html')

@app.route('/sheeran.html')
def sheeran():
    return render_template('sheeran.html')

@app.route('/speak_now.html')
def speak_now():
    return render_template('speak_now.html')

@app.route('/step.html')
def shee():
    return render_template('step.html')

@app.route('/taylor_swift.html')
def taylor_swift():
    return render_template('taylor_swift.html')

@app.route('/taylor.html')
def vs():
    return render_template('taylor.html')

@app.route('/voicenotes.html')
def voicenotes():
    return render_template('voicenotes.html')

@app.route('/walker.html')
def tayl():
    return render_template('walker.html')

@app.route('/walkerverse.html')
def walk():
    return render_template('walkerverse.html')

@app.route('/wonder.html')
def wonder():
    return render_template('wonder.html')

@app.route('/world.html')
def world():
    return render_template('world.html')

@app.route('/x.html')
def x():
    return render_template('x.html')

@app.route('/xd.html')
def xd():
    return render_template('xd.html')




if __name__ == '__main__':
    app.run(debug=True, port=5001)