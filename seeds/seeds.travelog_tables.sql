BEGIN;

TRUNCATE
    comments,
    articles,
    users
    RESTART IDENTITY CASCADE;

INSERT INTO users (email, username, password, first_name, last_name, profile_image)
VALUES
    ('user1@email.com', 'user1', '$2a$10$yivuED9JkAt3vWs4NYmIbuCZPq86Oylh8NaiX4FqLoFXVfq9kBENe', 'Mike', 'Sherman', 'https://loremflickr.com/750/300/paris,girl/random=1'),
    ('user2@email.com', 'user2', '$2a$10$yivuED9JkAt3vWs4NYmIbuCZPq86Oylh8NaiX4FqLoFXVfq9kBENe', 'Deb', 'Straus', 'https://loremflickr.com/750/300/paris,girl/random=2'),
    ('user3@email.com', 'user3', '$2a$10$yivuED9JkAt3vWs4NYmIbuCZPq86Oylh8NaiX4FqLoFXVfq9kBENe', 'Joe', 'Perry', 'https://loremflickr.com/750/300/paris,girl/random=3'),
    ('user4@email.com', 'user4', '$2a$10$yivuED9JkAt3vWs4NYmIbuCZPq86Oylh8NaiX4FqLoFXVfq9kBENe', 'Stan', 'Francisco', 'https://loremflickr.com/750/300/paris,girl/random=4'),
    ('user5@email.com', 'user5', '$2a$10$yivuED9JkAt3vWs4NYmIbuCZPq86Oylh8NaiX4FqLoFXVfq9kBENe', 'Warm', 'Milk', 'https://loremflickr.com/750/300/paris,girl/random=5');


INSERT INTO articles (title, description, body, author, username, image_url, user_id)
VALUES
    (
        'Sample Article 1', 
        'This is a little description about the article...',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum justo ipsum, malesuada sollicitudin suscipit eu, rutrum quis nunc. Suspendisse potenti. Duis gravida laoreet eros in venenatis. Vivamus sit amet risus non est accumsan viverra. Curabitur sodales, erat eget finibus mattis, est augue sagittis odio, eu volutpat diam leo eget risus. Nunc nec nisi lacinia, elementum turpis non, consectetur enim. Donec purus sapien, posuere ac sagittis eu, scelerisque quis massa. Maecenas posuere sit amet risus ut volutpat. Suspendisse potenti. Aenean accumsan diam id rhoncus malesuada. Morbi eros nulla, eleifend at enim sit amet, pretium porttitor dui. Etiam ut scelerisque justo, ac laoreet elit. Nullam scelerisque sapien nulla, eu faucibus metus blandit eu. Nullam vestibulum, quam ac gravida vehicula, ex tortor porta dui, nec iaculis tellus orci quis arcu. Duis eu libero non turpis condimentum maximus. Sed vulputate viverra lectus, in ultricies risus ultrices at. Praesent vestibulum risus a velit luctus, in sodales lacus sagittis. Praesent rutrum, ligula quis placerat hendrerit, augue risus aliquet enim, quis sollicitudin urna nibh eu turpis.',
        'Mike Sherman',
        'user1',
        'https://loremflickr.com/750/300/landscape?random=1',
        1
    ),
    (
        'Sample Article 2', 
        'This is a little description about the article...',
        'Maecenas nec vehicula magna, consequat porttitor diam. Morbi sodales eu odio ac mollis. Nunc vel finibus ipsum. Cras fringilla lacus sit amet lacus efficitur, venenatis imperdiet purus vulputate. Curabitur malesuada sem at augue finibus euismod. Nulla a odio ut nisi vehicula vulputate non non dolor. Ut luctus nulla luctus orci laoreet, vel dictum tortor auctor. Donec eu sollicitudin lorem. Morbi quis posuere purus. Pellentesque lobortis sem justo, sit amet aliquet est interdum nec. Cras sollicitudin, lectus id dapibus fringilla, elit neque sodales enim, sit amet maximus ligula dolor vitae enim. Donec varius maximus aliquet. Etiam et diam nec nulla viverra condimentum. Sed ut gravida purus, pretium ornare felis. Maecenas finibus accumsan cursus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nullam cursus iaculis ante, sit amet condimentum nulla efficitur eu. Sed ac magna lectus. Integer suscipit semper nulla, sed tincidunt sem tincidunt commodo. Phasellus tempus maximus massa eu cursus. Praesent ligula quam, mollis ut scelerisque sit amet, laoreet sed neque. Quisque pellentesque eros posuere nulla pretium, ut aliquet sem imperdiet. Aenean at tortor turpis. Sed dignissim sed purus sed malesuada. Proin vulputate nunc id felis sagittis, nec hendrerit augue consequat.',
        'Deb Straus',
        'user2',
        'https://loremflickr.com/750/300/landscape?random=2',
        2
    ),
    (
        'Sample Article 3', 
        'This is a little description about the article...',
        'Donec finibus neque quis est molestie, id volutpat metus auctor. Aliquam augue ante, ultrices ac lacinia non, vulputate quis nisl. Nullam vitae tempus urna. Integer nec cursus elit. Nullam finibus lectus libero, id malesuada dui interdum eget. Sed vitae tristique nunc, ac consectetur tortor. Quisque ac risus pharetra, consectetur diam in, convallis nibh. Nam interdum diam a sem iaculis malesuada. Vestibulum at felis est. Aliquam in congue dolor. Pellentesque felis purus, feugiat in urna cursus, sagittis pellentesque ipsum. Morbi vitae velit tortor. Fusce ut augue nec metus malesuada dapibus. Suspendisse hendrerit risus nec nisl molestie ullamcorper. Nunc vulputate sed nisl quis laoreet. Quisque vel varius ligula, vitae condimentum risus. Sed quis magna nisi. Nam bibendum gravida varius. Donec rhoncus sit amet risus ut dictum. Ut euismod risus sed ligula pulvinar lobortis.',        
        'Joe Perry',
        'user3',
        'https://loremflickr.com/750/300/landscape?random=3',
        3
    ),
    (
        'Sample Article 4', 
        'This is a little description about the article...',
        'Maecenas nec vehicula magna, consequat porttitor diam. Morbi sodales eu odio ac mollis. Nunc vel finibus ipsum. Cras fringilla lacus sit amet lacus efficitur, venenatis imperdiet purus vulputate. Curabitur malesuada sem at augue finibus euismod. Nulla a odio ut nisi vehicula vulputate non non dolor. Ut luctus nulla luctus orci laoreet, vel dictum tortor auctor. Donec eu sollicitudin lorem. Morbi quis posuere purus. Pellentesque lobortis sem justo, sit amet aliquet est interdum nec. Cras sollicitudin, lectus id dapibus fringilla, elit neque sodales enim, sit amet maximus ligula dolor vitae enim. Donec varius maximus aliquet. Etiam et diam nec nulla viverra condimentum. Sed ut gravida purus, pretium ornare felis. Maecenas finibus accumsan cursus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nullam cursus iaculis ante, sit amet condimentum nulla efficitur eu. Sed ac magna lectus. Integer suscipit semper nulla, sed tincidunt sem tincidunt commodo. Phasellus tempus maximus massa eu cursus. Praesent ligula quam, mollis ut scelerisque sit amet, laoreet sed neque. Quisque pellentesque eros posuere nulla pretium, ut aliquet sem imperdiet. Aenean at tortor turpis. Sed dignissim sed purus sed malesuada. Proin vulputate nunc id felis sagittis, nec hendrerit augue consequat.',
        'Stan Francisco',
        'user4',
        'https://loremflickr.com/750/300/landscape?random=4',
        4
    ),
    (
        'Sample Article 5', 
        'This is a little description about the article...',
        'Maecenas nec vehicula magna, consequat porttitor diam. Morbi sodales eu odio ac mollis. Nunc vel finibus ipsum. Cras fringilla lacus sit amet lacus efficitur, venenatis imperdiet purus vulputate. Curabitur malesuada sem at augue finibus euismod. Nulla a odio ut nisi vehicula vulputate non non dolor. Ut luctus nulla luctus orci laoreet, vel dictum tortor auctor. Donec eu sollicitudin lorem. Morbi quis posuere purus. Pellentesque lobortis sem justo, sit amet aliquet est interdum nec. Cras sollicitudin, lectus id dapibus fringilla, elit neque sodales enim, sit amet maximus ligula dolor vitae enim. Donec varius maximus aliquet. Etiam et diam nec nulla viverra condimentum. Sed ut gravida purus, pretium ornare felis. Maecenas finibus accumsan cursus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nullam cursus iaculis ante, sit amet condimentum nulla efficitur eu. Sed ac magna lectus. Integer suscipit semper nulla, sed tincidunt sem tincidunt commodo. Phasellus tempus maximus massa eu cursus. Praesent ligula quam, mollis ut scelerisque sit amet, laoreet sed neque. Quisque pellentesque eros posuere nulla pretium, ut aliquet sem imperdiet. Aenean at tortor turpis. Sed dignissim sed purus sed malesuada. Proin vulputate nunc id felis sagittis, nec hendrerit augue consequat.',
        'Warm Milk',
        'user5',
        'https://loremflickr.com/750/300/landscape?random=5',
        5
    );

INSERT INTO authors (name, about, profile_image)
VALUES
    (
        'Mike Sherman', 
        'Donec finibus neque quis est molestie, id volutpat metus auctor. Aliquam augue ante, ultrices ac lacinia non, vulputate quis nisl. Nullam vitae tempus urna. Integer nec cursus elit.',
        'https://loremflickr.com/750/300/paris,girl/random=1'
    ),
    (
        'Deb Straus',
        'Donec finibus neque quis est molestie, id volutpat metus auctor. Aliquam augue ante, ultrices ac lacinia non, vulputate quis nisl. Nullam vitae tempus urna. Integer nec cursus elit.',
        'https://loremflickr.com/750/300/paris,girl/random=2'
    ),
    (
        'Joe Perry',
        'Donec finibus neque quis est molestie, id volutpat metus auctor. Aliquam augue ante, ultrices ac lacinia non, vulputate quis nisl. Nullam vitae tempus urna. Integer nec cursus elit.',
        'https://loremflickr.com/750/300/paris,girl/random=3'
    ),
    (
        'Stan Francisco',
        'Donec finibus neque quis est molestie, id volutpat metus auctor. Aliquam augue ante, ultrices ac lacinia non, vulputate quis nisl. Nullam vitae tempus urna. Integer nec cursus elit.',
        'https://loremflickr.com/750/300/paris,girl/random=4'
    ),
    (
        'Warm Milk',
        'Donec finibus neque quis est molestie, id volutpat metus auctor. Aliquam augue ante, ultrices ac lacinia non, vulputate quis nisl. Nullam vitae tempus urna. Integer nec cursus elit.',
        'https://loremflickr.com/750/300/paris,girl/random=5'
    );

COMMIT;