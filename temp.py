from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///songs.db'
db = SQLAlchemy(app)


class Song(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), nullable=False)
    artist = db.Column(db.String(80), nullable=False)

    def __repr__(self):
        return f"<Song {self.id}>"

@app.route('/')
def index():
    songs = Song.query.all()
    return render_template('try.html', songs=songs)


@app.route('/add-to-playlist', methods=['POST'])
def add_to_playlist():
    song_id = request.json['songId']
    song = Song.query.get(song_id)

    if not song:
        # Song not found, return error message
        return jsonify({'error': 'Song not found.'}), 404

    # Song already exists in the playlist, return success message
    return jsonify({'message': 'Song already added to playlist.'}), 200


if __name__ == '__main__':
    app.run(debug=True)
